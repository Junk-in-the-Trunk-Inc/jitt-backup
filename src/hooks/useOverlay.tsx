import { useContext } from 'react';
import { OverlayContext } from '../contexts/OverlayContext';

export function useOverlay() {
    const cntxt = useContext(OverlayContext);
    if (cntxt == null) throw new Error('null context');
    return cntxt;
}
