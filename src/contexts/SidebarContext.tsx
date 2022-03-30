import { SidebarState } from '../providers/OverlayState';

export type ISidebarContext = {
    state: SidebarState;
    togglePin: () => void;
    cycle: () => void;
    content: JSX.Element[];
    appendContent(item: JSX.Element): void;
    popContent(): void;
};

export const LeftSidebarContext = React.createContext<undefined | ISidebarContext>(undefined);
