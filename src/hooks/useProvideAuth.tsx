import * as Realm from 'realm-web';
import appConfig from '../config/app-config.json';
import { useCallback } from 'react';
import React from 'react';
import { generateRandomString } from '../common/string/generateRandomString';
import { IAuthContext } from '../contexts/AuthContext';

export function useProvideAuth(): IAuthContext {
    const app = React.useRef<Realm.App>(new Realm.App(appConfig.mongodb.appID));
    const [flag, forceUpdate] = React.useState('');
    const locationUrl = () => app.current.locationUrl;
    const currentUser = React.useCallback(() => app.current.currentUser, []);
    const isAuthenticated = React.useCallback(() => currentUser() != null, [currentUser]);
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
    return {
        app: app.current,
        locationUrl,
        currentUser,
        isAuthenticated,
        logIn,
        logOut,
        register,
        email
    };
}
