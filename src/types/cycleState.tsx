import { overlayIndexMap, overlayMap } from '../providers/OverlayProvider';
import { OverlayState } from './OverlayState';

export function cycleState(current: OverlayState) {
    const result = overlayIndexMap[current] === 3 ? overlayMap[0] : overlayMap[overlayIndexMap[current] + 1];
    console.log('in', current);
    console.log('out', result);
    return result;
}
