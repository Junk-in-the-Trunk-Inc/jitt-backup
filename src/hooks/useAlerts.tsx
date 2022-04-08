import { useContext } from 'react';
import { ToasterContext } from '../contexts/ToasterContext';

export function useAlerts() {
    const context = useContext(ToasterContext);
    if (context == null) throw new Error('Alert Context Null');
    return context;
}
