import React from 'react';
import { VisiblityStatus } from '../hooks/useProvideOverlay';

export type IOverlayContext = {
    appendContent: (comp: JSX.Element) => void;
    head: () => JSX.Element | null;
    hasContent: () => boolean;
    status: VisiblityStatus;
    cycleStatus: () => void;
    popContent: () => void;
    modalRootElement: HTMLElement | null;
};

export const OverlayContext = React.createContext<undefined | IOverlayContext>(undefined);
