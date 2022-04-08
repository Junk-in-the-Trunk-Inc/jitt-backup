import React from 'react';
import { useAuth } from '../hooks/useAuth';

export function CurrentUserEmail() {
    const { isAuthenticated, email } = useAuth();
    return isAuthenticated() ? <span className='px-4 status-bar-item'>{email}</span> : null;
}
