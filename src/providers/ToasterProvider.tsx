import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { useProvideToasterComponent } from '../hooks/useProvideToaster';
import { faExclamationCircle, faThumbsDown, faThumbsUp, faBug, faTrafficCone } from '@fortawesome/pro-solid-svg-icons';

export type ToastCtor = (body: string, title?: string, subtitle?: string) => void;

export type IToasterContext = {
    toasts: JSX.Element[];
    createToast(body: string, title: string, icon: IconDefinition, subtitle?: string, bgColor?: string, textColor?: string): void;
    createInfoToast: ToastCtor;
    createSuccessToast: ToastCtor;
    createFailureToast: ToastCtor;
    createErrorToast: ToastCtor;
    createWarningToast: ToastCtor;
};

export const ToasterContext = React.createContext<undefined | IToasterContext>(undefined);

export function ToasterProvider({ children }: { children: Children }) {
    const { createToast, toasts } = useProvideToasterComponent();
    const createInfoToast = React.useCallback((body: string, title?: string, subtitle?: string) => createToast(body, title ?? 'INFORMATION', faExclamationCircle, subtitle, 'info'), [createToast]);
    const createWarningToast = React.useCallback((body: string, title?: string, subtitle?: string) => createToast(body, title ?? 'WARNING', faTrafficCone, subtitle, 'warning'), [createToast]);
    const createErrorToast = React.useCallback((body: string, title?: string, subtitle?: string) => createToast(body, title ?? 'ERROR', faBug, subtitle, 'error'), [createToast]);
    const createSuccessToast = React.useCallback((body: string, title?: string, subtitle?: string) => createToast(body, title ?? 'SUCCESS', faThumbsUp, subtitle, 'success'), [createToast]);
    const createFailureToast = React.useCallback((body: string, title?: string, subtitle?: string) => createToast(body, title ?? 'FAILURE', faThumbsDown, subtitle, 'failure'), [createToast]);

    const ctxt = React.useMemo(
        () => ({
            toasts,
            createToast,
            createInfoToast,
            createWarningToast,
            createErrorToast,
            createSuccessToast,
            createFailureToast
        }),
        [createErrorToast, createFailureToast, createInfoToast, createSuccessToast, createToast, createWarningToast, toasts]
    );

    return <ToasterContext.Provider value={ctxt}>{children}</ToasterContext.Provider>;
}
