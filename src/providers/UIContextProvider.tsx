import { UIContext } from '../contexts/UIContext';
import { Toast } from '../components/Toast';
import { useProviderToaster } from '../hooks/useProvideToaster';
import { useCallback, useMemo } from 'react';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faExclamationCircle, faTrafficCone, faThumbsUp, faThumbsDown, faBug } from '@fortawesome/pro-duotone-svg-icons';
import { useProvideOverlay } from '../hooks/useProvideOverlay';
import { useProvideSidebar } from '../hooks/useProvideSidebar';

// TODO Delete this

// export function UIContextProvider({ children }: { children?: React.ReactNode | React.ReactNode[] }) {
//     // eslint-disable-next-line @typescript-eslint/unbound-method
//     const { toasts, appendToast } = useProviderToaster();
//     const appendToastKind = useCallback(
//         (icon: IconDefinition, bgColor: string, textColor: string, title1?: string) => (body: string, subtitle?: string, title?: string) => {
//             appendToast(<Toast bgColor={bgColor} textColor={textColor} icon={icon} title={title1 ?? title ?? ''} subtitle={subtitle} body={body} />);
//         },
//         []
//     );
//     const addInfoToast = useMemo(() => appendToastKind(faExclamationCircle, 'bg-sky', 'text-black', 'INFORMATION'), [appendToastKind]);
//     const addWarningToast = useMemo(() => appendToastKind(faTrafficCone, 'bg-amber', 'text-black', 'CAUTION'), [appendToastKind]);
//     const addSuccessToast = useMemo(() => appendToastKind(faThumbsUp, 'bg-green', 'text-white', 'SUCCESS'), [appendToastKind]);
//     const addFailureToast = useMemo(() => appendToastKind(faThumbsDown, 'bg-red', 'text-white', 'FAILURE'), [appendToastKind]);
//     const addErrorToast = useMemo(() => appendToastKind(faBug, 'bg-lime-dark', 'text-black', 'CRITICAL'), [appendToastKind]);

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
//             appendToast: appendToast,
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
//     console.log('value', value);
//     return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
// }
