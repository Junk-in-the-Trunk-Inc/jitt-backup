import { HashRouter } from 'react-router-dom';
import { AuthProvider } from '../providers/AuthProvider';
import { LeftSidebarProvider } from '../providers/LeftSidebarProvider';
import { OverlayProvider } from '../providers/OverlayProvider';
import { ToasterProvider } from '../providers/ToasterProvider';


export function Wrappers({ children }: { children: Children }) {
    return (
        <ToasterProvider>
            <AuthProvider>
                <OverlayProvider>
                    <LeftSidebarProvider>
                        <HashRouter>{children}</HashRouter>
                    </LeftSidebarProvider>
                </OverlayProvider>
            </AuthProvider>
        </ToasterProvider>
    );
}
