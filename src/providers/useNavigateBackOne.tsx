import React from 'react';
import { useNavigate } from 'react-router';

export function useNavigateBackOne() {
    const navigate = useNavigate();
    return React.useCallback(() => navigate(-1), [navigate]);
}
