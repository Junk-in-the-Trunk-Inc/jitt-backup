import { useProvideContentComponent } from './useProvideContentComponent';

export function useProvideSidebar() {
    const { appendContent: sidebarAppendContent, head: sidebarHead, visible: sidebarVisible, shouldShow: sidebarShouldShow, popContent: sidebarPopContent, toggleElement: sidebarToggle } = useProvideContentComponent();
    return {
        sidebarAppendContent,
        sidebarHead,
        sidebarShouldShow,
        sidebarToggle,
        sidebarPopContent,
        sidebarVisible
    };
}

export type ISidebarContext = {
    isVisible
}