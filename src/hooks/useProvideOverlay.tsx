import React, { cloneElement } from 'react';
import { useCallback, useMemo, useState } from 'react';
import { generateRandomString } from '../common/string/generateRandomString';

export type VisiblityStatus = 'hidden' | 'hiding' | 'showing' | 'shown';
export function useProvideOverlay() {
    const [content, setContent] = useState<Array<JSX.Element>>([]);
    const modalRootElement = useMemo(() => document.getElementById('modal-root'), []);
    const appendContent = useCallback((comp: JSX.Element) => {
        setContent((prev) => {
            if (prev.includes(comp)) {
                throw new Error('duplicated');
            }
            return [...prev, cloneElement(comp, { ...comp.props, key: generateRandomString(10) })];
        });
    }, []);
    const popContent = useCallback(() => {
        setContent((prev) => {
            if (prev.length === 0) return prev;
            const [head, ...tail] = prev;
            return tail;
        });
    }, []);
    const head = useCallback(() => {
        if (content.length === 0) return null;
        const [head, ...tail] = content;
        return head;
    }, [content]);
    const hasContent = useCallback(() => {
        return content.length > 0;
    }, [content.length]);
    const [status, setStatus] = useState<VisiblityStatus>('hidden');
    const cycleStatus = useCallback(() => {
        setStatus((prev) => {
            switch (prev) {
                case 'hidden':
                    return 'showing';
                case 'hiding':
                    return 'hidden';
                case 'shown':
                    return 'hiding';
                case 'showing':
                    return 'shown';
            }
        });
    }, []);

    React.useEffect(() => {
        if (hasContent()) {
            if (status === 'hidden') {
                return cycleStatus();
            }
            return;
        } else {
            if (status === 'shown') {
                return cycleStatus();
            }
        }
    }, [cycleStatus, hasContent, status]);
    // const portal = ReactDOM.createPortal(<Fc content={content} overlayHead={overlayHead} overlayShouldShow={overlayShouldShow} overlayVisible={overlayVisible} />, el);

    return useMemo(
        () => ({
            appendContent,
            head,
            hasContent,
            status,
            cycleStatus,
            popContent,
            modalRootElement
        }),
        [appendContent, cycleStatus, hasContent, head, modalRootElement, popContent, status]
    );
}
