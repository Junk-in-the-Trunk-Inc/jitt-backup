import React, { cloneElement, useMemo } from 'react';
import { generateRandomString } from '../common/string/generateRandomString';
import { LeftSidebar } from '../components/LeftSidebar';
import { ISidebarContext } from '../contexts/SidebarContext';
import { cycleSidebarState } from '../providers/OverlayState';
import { SidebarState } from '../types/SidebarState';
import { useProvideContentComponent } from './useProvideContentComponent';

export function useProvideSidebar(): ISidebarContext {
    const [state, setState] = React.useState<SidebarState>('hidden');
    const cycle = React.useCallback(() => setState((x) => cycleSidebarState(x)), []);
    const pinSidebar = React.useCallback(() => setState('pinned'), []);
    const unpinSidebar = React.useCallback(() => setState('not_pinned'), []);
    const togglePin = React.useCallback(() => setState((prev) => (prev === 'pinned' ? 'not_pinned' : 'pinned')), []);
    const [content, setContent] = React.useState<JSX.Element[]>([]);
    const appendContent = React.useCallback((item: JSX.Element) => {
        setContent((prev) => [...prev, cloneElement(item, { ...item.props, key: generateRandomString(10) })]);
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
    const El = useMemo(() => <LeftSidebar />, []);
    return React.useMemo(
        () => ({
            state,
            cycle,
            togglePin,
            content,
            appendContent,
            popContent,
            El
        }),
        [appendContent, content, cycle, popContent, state, togglePin]
    );
}
