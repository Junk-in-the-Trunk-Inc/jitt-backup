import React from 'react';

export type IToasterContext = {
    toasts: JSX.Element[];
    addInfoToast(body: string, subtitle?: string, title?: string): void;
    addWarningToast(body: string, subtitle?: string, title?: string): void;
    addErrorToast(body: string, subtitle?: string, title?: string): void;
    addSuccessToast(body: string, subtitle?: string, title?: string): void;
    addFailureToast(body: string, subtitle?: string, title?: string): void;
};

export const ToasterContext = React.createContext<IToasterContext | undefined>(undefined);
