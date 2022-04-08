import React, { useMemo } from 'react';
import { cn } from '../util/cn';
import { cycleState } from '../types/cycleState';
import { OverlayState } from '../types/OverlayState';
import { useWhyDidYou } from '../components/routing/useWhyDidYou';
import { content } from '../../tailwind.config';
import { VisiblityStatus } from '../hooks/useProvideOverlay';

export function FullscreenOverlay(props: { hasContent: () => boolean; status: VisiblityStatus; cycleStatus: () => void; overlayHead: () => JSX.Element | null }) {
    useWhyDidYou('FullscreenOverlay', props);
    const { cycleStatus, overlayHead: head, status } = props;
    const onAnimationEnd = React.useCallback(() => {
        cycleStatus();
    }, [cycleStatus]);
    const children = useMemo(() => head(), [head]);
    const $cn = React.useMemo(
        () =>
            cn(
                {
                    hidden: status === 'hidden',
                    pulseInCenter: status === 'showing',
                    pulseOutCenter: status === 'hiding',
                    flex: status !== 'hidden',
                    'pointer-events-auto': status !== 'hidden',
                    'pointer-events-none': status === 'hidden'
                },
                'items-baseline justify-center w-full h-full p-5 overflow-auto border-2 border-cyan rounded-2xl bg-zinc-very-dark/70 transition duration-1000 delay-150 ease-in-out'
            ),
        [status]
    );
    return (
        <div className={$cn} onAnimationEnd={onAnimationEnd}>
            {children}
        </div>
    );
}
