import { HashRouter } from 'react-router-dom';
import { AuthProvider } from '../providers/AuthProvider';
import { OverlayProvider } from '../providers/OverlayProvider';
import { ToasterProvider } from '../providers/ToasterProvider';

export function Wrappers({ children }: { children: Children }) {
    return (
        <ToasterProvider>
            <AuthProvider>
                <OverlayProvider>
                    <HashRouter>{children}</HashRouter>
                </OverlayProvider>
            </AuthProvider>
        </ToasterProvider>
    );
}
