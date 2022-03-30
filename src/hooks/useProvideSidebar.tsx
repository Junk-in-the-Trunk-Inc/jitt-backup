import React from 'react';
import { ISidebarContext } from '../contexts/SidebarContext';
import { SidebarState, cycleSidebarState } from '../providers/OverlayState';
import { useProvideContentComponent } from './useProvideContentComponent';

export function useProvideSidebar(): ISidebarContext {
    const [state, setState] = React.useState<SidebarState>('hidden');
    const cycle = React.useCallback(() => setState((x) => cycleSidebarState(x)), []);
    const pinSidebar = React.useCallback(() => setState('pinned'), []);
    const unpinSidebar = React.useCallback(() => setState('not_pinned'), []);
    const togglePin = React.useCallback(() => setState((prev) => (prev === 'pinned' ? 'not_pinned' : 'pinned')), []);
    const [content, setContent] = React.useState<JSX.Element[]>([]);
    const appendContent = React.useCallback((item: JSX.Element) => {
        setContent((prev) => [...prev, item]);
    }, []);
    const popContent = React.useCallback(
        () =>
            setContent((prev) => {
                if (prev.length === 0) return prev;
                const [head, ...tail] = prev;
                return tail;
            }),
        []
    );
    return React.useMemo(
        () => ({
            state,
            cycle,
            togglePin,
            content,
            appendContent,
            popContent
        }),
        [appendContent, content, cycle, popContent, state, togglePin]
    );
}
