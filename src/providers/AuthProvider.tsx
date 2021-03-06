import * as Realm from 'realm-web';
import { stringify } from 'querystring';
import React from 'react';
import { useProvideAuth } from '../hooks/useProvideAuth';
import { AuthContext } from '../contexts/AuthContext';
import { ApolloProvider } from '@apollo/client';


export function AuthProvider({ children }: { children?: Children }) {
    const value = useProvideAuth();
    const currentUser = React.useMemo(() => value.currentUser(), [value]);
    return <AuthContext.Provider value={value}>
        <ApolloProvider client={value.client}>
            {children}
        </ApolloProvider>
    </AuthContext.Provider>;
}
