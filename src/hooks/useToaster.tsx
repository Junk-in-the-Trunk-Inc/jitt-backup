import React from 'react';
import { ToasterContext } from '../contexts/ToasterContext';

export function useToaster() {
    const ctxt = React.useContext(ToasterContext);
    if (ctxt == null) console.info('ToasterContext was null.')
    return ctxt!;
}
