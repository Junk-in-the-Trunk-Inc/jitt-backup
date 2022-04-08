import { useProvideSidebar } from '../hooks/useProvideSidebar';
import { LeftSidebarContext } from '../contexts/SidebarContext';
import { useWhyDidYou } from '../components/routing/useWhyDidYou';

export function LeftSidebarProvider(props: { children?: Children }) {
    useWhyDidYou('LeftSidebarProvider', props);
    const { children } = props;
    const value = useProvideSidebar();
    useWhyDidYou('LeftsidebarContext.Provider', value);
    return <LeftSidebarContext.Provider value={value}>{children}</LeftSidebarContext.Provider>;
}
