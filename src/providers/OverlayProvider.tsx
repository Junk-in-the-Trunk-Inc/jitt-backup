import React from 'react';
import { OverlayContext } from '../contexts/OverlayContext';
import { useProvideOverlay } from '../hooks/useProvideOverlay';
import { FullscreenOverlay } from './FullscreenOverlay';
import { OverlayState } from '../types/OverlayState';

export const overlayMap: Record<number, OverlayState> = {
    0: 'hidden',
    1: 'showing',
    2: 'shown',
    3: 'hiding'
};
export const overlayIndexMap: Record<OverlayState, number> = {
    hidden: 0,
    showing: 1,
    shown: 2,
    hiding: 3
};

export function OverlayProvider({ children }: { children?: Children }) {
    const value = useProvideOverlay(FullscreenOverlay);

    return (
        <OverlayContext.Provider value={value}>
            {children}
            {value.portal}
        </OverlayContext.Provider>
    );
}
