import React from 'react';
import { AuthContext } from '../contexts/AuthContext';

export function useAuth() {
    const ctxt = React.useContext(AuthContext);
    if (ctxt == null) throw new Error('null context');
    return ctxt;
}
