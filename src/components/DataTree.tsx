import React from 'react';
import { useLeftSidebar } from '../hooks/useLeftSidebar';
import { useOnMount } from '../hooks/useOnMount';
import { ignore } from '../common/ignore';
import { NavigationTree } from './NavigationTree';
import { Outlet } from 'react-router';

export function DataTree() {
    const left = useLeftSidebar();
    useOnMount(() => (left.content.length === 0 ? left.appendContent(<NavigationTree />) : ignore()), ignore);
    useOnMount(() => {
        if (left.state === 'hidden') {
            left.cycle();
        }
    }, ignore);
    return <Outlet />;
}
