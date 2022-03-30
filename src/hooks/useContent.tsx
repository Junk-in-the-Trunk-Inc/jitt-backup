import { useCallback, useMemo, useState } from 'react';

export function useContent() {
    const [content, setContent] = useState<JSX.Element[]>([]);
    const appendContent = useCallback((content: JSX.Element) => {
        setContent((prev) => [...prev, content]);
    }, []);
    const popContent = useCallback(() => {
        setContent((prev) => {
            if (prev.length === 0) throw new Error('nothing to pop');
            const [h, ...t] = prev;
            return t;
        });
    }, []);
    const hasContent = useCallback(() => content.length !== 0, [content]);
    const head = useCallback(() => (content.length !== 0 ? content[0] : <></>), [content]);
    return {
        content,
        appendContent,
        popContent,
        hasContent,
        head
    };
}
