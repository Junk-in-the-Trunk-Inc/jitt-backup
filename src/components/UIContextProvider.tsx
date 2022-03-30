import { UIContext } from '../contexts/UIContext';
import { Toast } from './Toast';
import { useProviderToaster } from '../hooks/useProvideToaster';
import { useMemo } from 'react';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faExclamationCircle, faTrafficCone, faThumbsUp, faThumbsDown, faBug } from '@fortawesome/pro-duotone-svg-icons';
import { useProvideOverlay } from '../hooks/useProvideOverlay';
import { useProvideSidebar } from "../hooks/useProvideSidebar";

// TODO Delete this

export function useProvideUIContext() {
    return;
}

// export default function UIContextProvider({ children }: { children?: React.ReactNode | React.ReactNode[] }) {
//     // eslint-disable-next-line @typescript-eslint/unbound-method
//     const { toasts, appendToast } = useProviderToaster();
//     const appendToastKind = (icon: IconDefinition, bgColor: string, textColor: string, title1?: string) => (body: string, subtitle?: string, title?: string) => {
//         appendToast(<Toast bgColor={bgColor} textColor={textColor} icon={icon} title={title1 ?? title ?? ''} subtitle={subtitle} body={body} />);
//     };
//     const addInfoToast = appendToastKind(faExclamationCircle, 'bg-sky', 'text-black', 'INFORMATION');
//     const addWarningToast = appendToastKind(faTrafficCone, 'bg-amber', 'text-black', 'CAUTION');
//     const addSuccessToast = appendToastKind(faThumbsUp, 'bg-green', 'text-white', 'SUCCESS');
//     const addFailureToast = appendToastKind(faThumbsDown, 'bg-red', 'text-white', 'FAILURE');
//     const addErrorToast = appendToastKind(faBug, 'bg-lime-dark', 'text-black', 'CRITICAL');

//     const { overlayAppendContent, overlayHead, overlayShouldShow, overlayVisible, overlayPopContent } = useProvideOverlay();
//     const {
//         sidebarAppendContent: rightSidebarAppendContent,
//         sidebarHead: rightSidebarHead,
//         sidebarToggle: rightSidebarToggle,
//         sidebarPopContent: rightSidebarPopContent,
//         sidebarVisible: rightSidebarVisible
//     } = useProvideSidebar();
//     const {
//         sidebarAppendContent: leftSidebarAppendContent,
//         sidebarHead: leftSidebarHead,
//         sidebarToggle: leftSidebarToggle,
//         sidebarPopContent: leftSidebarPopContent,
//         sidebarVisible: leftSidebarVisible
//     } = useProvideSidebar();

//     const value = useMemo(
//         () => ({
//             toasts,
//             appendToast,
//             addInfoToast,
//             addErrorToast,
//             addSuccessToast,
//             addFailureToast,
//             addWarningToast,
//             overlayAppendContent,
//             overlayHead,
//             overlayShouldShow,
//             overlayPopContent,
//             overlayVisible,
//             rightSidebarAppendContent,
//             rightSidebarPopContent,
//             rightSidebarToggle,
//             rightSidebarHead,
//             rightSidebarVisible,
//             leftSidebarAppendContent,
//             leftSidebarPopContent,
//             leftSidebarHead,
//             leftSidebarToggle,
//             leftSidebarVisible
//         }),
//         [
//             addErrorToast,
//             addFailureToast,
//             addInfoToast,
//             addSuccessToast,
//             appendToast,
//             addWarningToast,
//             leftSidebarAppendContent,
//             leftSidebarHead,
//             leftSidebarPopContent,
//             leftSidebarToggle,
//             leftSidebarVisible,
//             overlayAppendContent,
//             overlayHead,
//             overlayShouldShow,
//             overlayPopContent,
//             overlayVisible,
//             rightSidebarAppendContent,
//             rightSidebarHead,
//             rightSidebarPopContent,
//             rightSidebarToggle,
//             rightSidebarVisible,
//             toasts
//         ]
//     );
//     return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
// }
