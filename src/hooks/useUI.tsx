import { useContext } from 'react';
import { UIContext } from '../components/UIContext';

export function useUI() {
    const result = useContext(UIContext);
    if (result == null) throw new Error('empty context');
    return result;
}
