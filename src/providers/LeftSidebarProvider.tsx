import { useProvideSidebar } from '../hooks/useProvideSidebar';
import { LeftSidebarContext } from '../contexts/SidebarContext';

export function LeftSidebarProvider({ children }: { children?: Children }) {
    const value = useProvideSidebar();
    return <LeftSidebarContext.Provider value={value}>{children}</LeftSidebarContext.Provider>;
}
