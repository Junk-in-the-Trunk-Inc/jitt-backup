import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import React from 'react';

export type IAuthContext = {
    email: string;
    currentUser: () => Realm.User | null;
    app: Realm.App;
    isAuthenticated: () => boolean;
    logIn: (creds: { email: string; password: string }) => Promise<Realm.User | null>;
    logOut: () => Promise<void>;
    register: (creds: { email: string; password: string }) => Promise<void>;
    locationUrl: () => Promise<string>;
    client: ApolloClient<NormalizedCacheObject>;
};

export const AuthContext = React.createContext<IAuthContext | undefined>(undefined);
