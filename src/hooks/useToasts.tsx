import { useContext } from 'react';
import { UIContext } from '../contexts/UIContext';

export function useToasts() {
    return useContext(UIContext)!.toasts();
}
