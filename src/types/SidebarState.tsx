import { OverlayState } from '../providers/OverlayState';

export type SidebarState = Exclude<OverlayState, 'shown'> | 'not_pinned' | 'pinned';
