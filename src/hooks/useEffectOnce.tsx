import React from 'react';

export function useEffectOnce(func: () => void) {
    React.useEffect(func, [func]);
}
