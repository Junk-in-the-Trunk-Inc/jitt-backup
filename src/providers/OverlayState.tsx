export type OverlayState = 'hidden' | 'hiding' | 'shown' | 'showing';
export type SidebarState = Exclude<OverlayState, 'shown'> | 'not_pinned' | 'pinned';

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
    if (sidebarStateToInt[curr] === 4) {
        return intToSidebarState[0];
    }
    return intToSidebarState[sidebarStateToInt[curr] + 1];
}