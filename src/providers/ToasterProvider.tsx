import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { useProvideToaster } from '../hooks/useProvideToaster';
import { faExclamationCircle, faThumbsDown, faThumbsUp, faBug, faTrafficCone } from '@fortawesome/pro-solid-svg-icons';
import { ToasterContext } from '../contexts/ToasterContext';
import React from 'react';
import { ToastType } from '../components/Toast';

export type ToastCtor = (body: string, title?: string, subtitle?: string) => void;


export function ToasterProvider({ children }: { children: Children }) {
    const { createToast, toasts } = useProvideToaster();
    const toToastCreator = React.useCallback((defTitle: string, icon: IconDefinition, tt: ToastType) => (body: string, title?: string, subtitle?: string) => createToast(body, title ?? defTitle, icon, subtitle, tt), [createToast]);

    const addInfoToast = toToastCreator('INFO', faExclamationCircle, 'info');
    const addSuccessToast = toToastCreator('SUCCESS', faThumbsUp, 'success');
    const addFailureToast = toToastCreator('FAILURE', faThumbsDown, 'failure');
    const addErrorToast = toToastCreator('ERROR', faBug, 'error');
    const addWarningToast = toToastCreator('WARNING', faTrafficCone, 'warning');

    const ctxt = React.useMemo(
        () => ({
            toasts,
            addInfoToast,
            addWarningToast,
            addSuccessToast,
            addFailureToast,
            addErrorToast
        }),
        [addErrorToast, addFailureToast, addInfoToast, addSuccessToast, addWarningToast, toasts]
    );

    return <ToasterContext.Provider value={ctxt}>{children}</ToasterContext.Provider>;
}
