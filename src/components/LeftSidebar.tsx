import React, { useMemo } from 'react';
import { cycleSidebarState } from '../providers/OverlayState';
import { SidebarState } from '../types/SidebarState';
import { BtnGroup } from './BtnGroup';
import { faWindowClose, faThumbTack } from '@fortawesome/pro-duotone-svg-icons';
import { cn } from '../util/cn';
import { IconButton } from './IconButton';
import { useLeftSidebar } from '../hooks/useLeftSidebar';
import { useWhyDidYou } from './routing/useWhyDidYou';
import { useCloneElement } from '../hooks/useCloneElement';

export function LeftSidebar() {
    useWhyDidYou('LeftSidebar', {});   
    const { state, cycle, togglePin, content } = useLeftSidebar();
    useWhyDidYou('LeftSidebar-content', content);
    const className = cn(
        {
            slideInLeft: state === 'showing' || state === 'hidden',
            slideOutLeft: state === 'hiding',
            'translate-x-0': state === 'pinned' || state === 'not_pinned',
            hidden: state === 'hidden',
            flex: state !== 'hidden',
            relative: state === 'pinned',
            absolute: state === 'not_pinned' || state === 'hidden' || state === 'hiding' || state === 'showing'
        },
        'transition duration-1000 delay-150 ease-in-out absolute top-0 bottom-0 h-full border-r-2 rounded-r-lg shadow-md shadow-white bg-zinc-dark/75 border-white/50 resize-x flex flex-col'
    );
    const clonedContent = useCloneElement(content, {});
    const p = useMemo(() => ({children: clonedContent}), [clonedContent]);
    useWhyDidYou('clonedContent', p);
    return (
        <div className={className} id='left-sidebar' onAnimationEnd={cycle}>
            <div className='flex flex-row items-center justify-between w-full bg-black border border-white '>
                <span className='flex items-center w-auto h-full text-base font-semibold text-white justify-self-start font-fira-sans'>Navigation</span>
                <BtnGroup className='flex flex-row ml-4 justify-self-end'>
                    <IconButton icon={faThumbTack} className='object-fill theme-primary' size='sm' onClick={togglePin} aria-pressed={state === 'pinned'} bordered fw  />
                    <IconButton icon={faWindowClose} className='object-fill theme-primary' size='sm' onClick={cycle} bordered inverse fw />
                </BtnGroup>
            </div>
            {clonedContent}
        </div>
    );
}
