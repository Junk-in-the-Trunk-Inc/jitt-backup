import { SidebarState } from '../types/SidebarState';

export type ISidebarContext = {
    state: SidebarState;
    togglePin: () => void;
    cycle: () => void;
    content: JSX.Element[];
    appendContent(item: JSX.Element): void;
    popContent(): void;
    El: JSX.Element;
};

export const LeftSidebarContext = React.createContext<undefined | ISidebarContext>(undefined);
