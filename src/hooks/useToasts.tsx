import { useContext, useMemo } from 'react';
import { ToasterContext } from '../contexts/ToasterContext';
import { useToaster } from './useToaster';

export function useToasts() {
    const ctx = useToaster();
    return useMemo(() => ctx.toasts, [ctx.toasts]);
}
