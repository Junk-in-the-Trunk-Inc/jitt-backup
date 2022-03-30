import React from 'react';
import { LeftSidebarContext } from '../contexts/SidebarContext';

export function useLeftSidebar() {
    const context = React.useContext(LeftSidebarContext);
    if (context == null) throw new Error('null context');
    return context;
}