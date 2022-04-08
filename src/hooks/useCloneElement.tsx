import { cloneElement, useMemo } from 'react';
import React from 'react';

export function useCloneElement<T>(children: Children, additionalProps: T): Children {
    return useMemo(() => {
        return React.Children.toArray(children).map((el, ix) => cloneElement(el as JSX.Element, { ...(el as JSX.Element).props, key: ix, ...additionalProps }));
    }, [additionalProps, children]);
}
