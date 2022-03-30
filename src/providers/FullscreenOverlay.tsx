import React from 'react';
import { cn } from '../util/cn';
import { cycleState } from '../types/cycleState';
import { OverlayState } from "../types/OverlayState";

export function FullscreenOverlay({
    content,
    overlayHead,
    overlayVisible,
    overlayShouldShow
}: {
    content: JSX.Element[];
    overlayVisible: boolean;
    overlayHead: () => JSX.Element;
    overlayShouldShow: () => boolean;
}) {
    return (function FullscreenOverlay() {
        const [state, setState] = React.useState<OverlayState>('hidden');
        // eslint-disable-next-line react-hooks/exhaustive-deps
        const shouldShow = React.useCallback(() => content.length !== 0, [content]);
        const head = React.useMemo(() => (shouldShow() ? content[0] : <></>), [shouldShow]);

        const onAnimationEnd = React.useCallback(() => {
            setState((x) => cycleState(x));
        }, []);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        React.useEffect(() => {
            if ((shouldShow() && state === 'hidden') || (!shouldShow() && state === 'shown')) {
                setState((x) => cycleState(x));
            }
        }, [shouldShow, state]);
        const $cn = React.useMemo(
            () =>
                cn(
                    {
                        hidden: state === 'hidden',
                        pulseInCenter: state === 'showing',
                        pulseOutCenter: state === 'hiding',
                        flex: state !== 'hidden',
                        'pointer-events-auto': state !== 'hidden',
                        'pointer-events-none': state === 'hidden'
                    },
                    'items-center justify-center w-full h-full p-5 overflow-auto border-2 border-cyan rounded-2xl bg-zinc-very-dark/70 transition duration-1000 delay-150 ease-in-out'
                ),
            [state]
        );
        return (
            <div className={$cn} onAnimationEnd={onAnimationEnd}>
                {head}
            </div>
        );
    })();
}
