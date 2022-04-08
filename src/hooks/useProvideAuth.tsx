import * as Realm from 'realm-web';
import appConfig from '../config/app-config.json';
import { useCallback, useEffect } from 'react';
import React from 'react';
import { generateRandomString } from '../common/string/generateRandomString';
import { IAuthContext } from '../contexts/AuthContext';
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client';

export const realmApp = new Realm.App(appConfig.mongodb.appID);

async function getValidAccessToken() {
    if (!realmApp.currentUser) {
        return ''; 
    } else {
        await realmApp.currentUser.refreshAccessToken();
    }
    return realmApp.currentUser.accessToken;
}

export function useProvideAuth(): IAuthContext {
    const app = React.useRef<Realm.App>(new Realm.App(appConfig.mongodb.appID));
    const [flag, forceUpdate] = React.useState('');
    const locationUrl = () => app.current.locationUrl;
    const currentUser = React.useCallback(() => app.current.currentUser, []);
    const isAuthenticated = React.useCallback(() => currentUser() != null, [currentUser]);
    const authToken = React.useMemo(() => currentUser()?.accessToken, [currentUser]);
    const logIn = React.useCallback(
        ({ email, password }: { email: string; password: string }) =>
            app.current.logIn(Realm.Credentials.emailPassword(email, password)).then((x) => {
                forceUpdate(generateRandomString(24));
                return x;
            }),
        [app]
    );
    const logOut = React.useCallback(() => {
        const cu = currentUser();
        if (cu == null) return Promise.resolve();
        return cu.logOut().then((x) => forceUpdate(generateRandomString(24)));
    }, [currentUser]);
    const register = useCallback(({ email, password }: { email: string; password: string }) => {
        return app.current.emailPasswordAuth.registerUser(email, password);
    }, []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const user = React.useMemo(() => currentUser(), [currentUser, flag]);
    console.log('user', user);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const email: string = React.useMemo(() => (user == null ? 'unregistered' : user.profile.email ?? (user as any)?._profile?.email ?? 'unregistered'), [user, flag]);
    const graphqlui = 'https://realm.mongodb.com/api/client/v2.0/app/junkyard-gjgce/graphql';

    const client = new ApolloClient({
        link: new HttpLink({
            uri: graphqlui,
            fetch: async (uri, options: RequestInit) => {
                const token = await getValidAccessToken();
                (options.headers as any).Authorization = `Bearer ${authToken ?? 'token'}`;
                console.log(token, options);
                return fetch(uri, options);
            }
        }),
        cache: new InMemoryCache()
    });
    useEffect(() => {
       setTimeout(() => {
           currentUser()?.refreshCustomData();
       }, 3000); 
    })
    return {
        app: app.current,
        locationUrl,
        currentUser,
        isAuthenticated,
        logIn,
        logOut,
        register,
        email,
        client
    };
}
