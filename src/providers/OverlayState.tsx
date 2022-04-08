import { SidebarState } from '../types/SidebarState';

export type OverlayState = 'hidden' | 'hiding' | 'shown' | 'showing';
const sidebarStateToInt: Record<SidebarState, number> = {
    hidden: 0,
    showing: 1,
    not_pinned: 2,
    pinned: 3,
    hiding: 4
};
const intToSidebarState: Record<number, SidebarState> = {
    0: 'hidden',
    1: 'showing',
    2: 'not_pinned',
    3: 'pinned',
    4: 'hiding'
};

export function cycleSidebarState(curr: SidebarState) {
    switch (curr) {
        case 'hidden':
            return 'showing';
        case 'hiding':
            return 'hidden';
        case 'not_pinned':
        case 'pinned':
            return 'hiding';
        case 'showing':
            return 'pinned';
    }
}
