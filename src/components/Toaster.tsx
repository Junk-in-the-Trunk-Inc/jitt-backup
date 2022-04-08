import React from 'react';
import { useAlerts } from '../hooks/useAlerts';
import { useToasts } from '../hooks/useToasts';
import { useWhyDidYou } from './routing/useWhyDidYou';

export function Toaster() {
    const toasts = useToasts();
    useWhyDidYou('Toaster', toasts);
    return <div className='absolute top-0 flex flex-col-reverse items-center w-1/5 h-full left-2/3'>{toasts}</div>;
}
