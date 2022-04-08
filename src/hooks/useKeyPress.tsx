import { useCallback } from 'react';

export function useKeyPress(key: string, action: () => void) {
    const onKeyDown = useCallback(
        (ev: KeyboardEvent) => {
            console.log('onKeyDown', ev, ev.key);
            if (key === ev.key) {
                action();
            }
        },
        [action, key]
    );
    return onKeyDown;
}
