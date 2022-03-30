import React from 'react';
import { cycleSidebarState, SidebarState } from '../providers/OverlayState';
import { BtnGroup } from './BtnGroup';
import { faWindowClose, faThumbTack } from '@fortawesome/free-solid-svg-icons';
import { cn } from '../util/cn';
import { IconButton } from './IconButton';

export function LeftSidebar() {
    const [state, setState] = React.useState<SidebarState>('hidden');
    const pinSidebar = React.useCallback(() => setState('pinned'), []);
    const unpinSidebar = React.useCallback(() => setState('not_pinned'), []);
    const cycleState = React.useCallback(() => setState((x) => cycleSidebarState(x)), []);
    const onAnimationEnd = React.useCallback(() => cycleState(), [cycleState]);
    const togglePin = React.useCallback(() => (state === 'pinned' ? unpinSidebar() : pinSidebar()), [pinSidebar, state, unpinSidebar]);

    const className = React.useMemo(
        () =>
            cn(
                {
                    slideInLeft: state === 'showing',
                    slideOutLeft: state === 'hiding',
                    hidden: state === 'hidden',
                    flex: state !== 'hidden'
                },
                'transition duration-1000 delay-150 ease-in-out w-1/4 absolute left-0 h-full border-r-2 rounded-r-lg shadow-md shadow-white bg-zinc-dark/75 border-white/50 resize-x flex flex-col'
            ),
        [state]
    );

    return (
        <aside className={className} id='left-sidebar'>
            <div className='flex flex-row items-center justify-between w-full h-12'>
                <BtnGroup className='space-x-1 justify-self-end'>
                    <IconButton icon={faThumbTack} className='object-fill w-12 h-12 text-white border border-cyan btn-blue' onClick={togglePin} aria-pressed={state === 'pinned'} />
                    <IconButton icon={faWindowClose} className='object-fill w-12 h-12 text-white border border-cyan btn-blue' onClick={cycleState} />
                </BtnGroup>
            </div>
        </aside>
    );
}
