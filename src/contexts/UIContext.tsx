import { createContext } from 'react';

export type IUIContext = {
    toasts: () => JSX.Element[];
    appendToast(item: JSX.Element): void;
    addInfoToast(body: string, subtitle?: string, title?: string): void;
    addWarningToast(body: string, subtitle?: string, title?: string): void;
    addErrorToast(body: string, subtitle?: string, title?: string): void;
    addSuccessToast(body: string, subtitle?: string, title?: string): void;
    addFailureToast(body: string, subtitle?: string, title?: string): void;
    overlayAppendContent(el: JSX.Element): void;
    overlayPopContent(): void;
    overlayHead: () => JSX.Element;
    overlayShouldShow: () => boolean;
    overlayVisible: boolean;
    rightSidebarAppendContent(el: JSX.Element): void;
    rightSidebarPopContent(): void;
    rightSidebarHead: () => JSX.Element;
    rightSidebarToggle: () => void;
    rightSidebarVisible: boolean;
    leftSidebarAppendContent(el: JSX.Element): void;
    leftSidebarPopContent(): void;
    leftSidebarHead: () => JSX.Element;
    leftSidebarToggle: () => void;
    leftSidebarVisible: boolean;
};


export const UIContext = createContext<IUIContext | undefined>(undefined);
