import React from 'react';
import { ignore } from '../common/ignore';

export function useOnMount(action: () => void, cleanup: () => void = ignore) {
    console.log('useOnMount');
    React.useEffect(() => {
        action();       
        return cleanup;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
}
