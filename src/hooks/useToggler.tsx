import { useCallback, useState } from 'react';

export function useToggler(init = false): [isToggled: boolean, setToggleOn: () => void, setToggleOff: () => void, toggle: () => void] {
    const [isVisible, setIsVisible] = useState(init);
    const hideElement = useCallback(() => setIsVisible(false), []);
    const showElement = useCallback(() => setIsVisible(true), []);
    const toggleElement = useCallback(() => setIsVisible((prev) => !prev), []);
    return [isVisible, showElement, hideElement, toggleElement];
}
