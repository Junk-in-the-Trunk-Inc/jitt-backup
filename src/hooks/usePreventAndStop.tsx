import React, { useCallback } from 'react';

export function usePreventAndStop<TElement, TEvent, TSynthetic extends React.SyntheticEvent<TElement, TEvent>>() {
    return useCallback((ev: TSynthetic) => {
        ev.preventDefault();
        ev.stopPropagation();
    }, []);
}
