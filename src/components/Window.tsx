/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/unbound-method */
import { Toaster } from './Toaster';
import { ToasterContext } from '../providers/ToasterProvider';
import { useLocation, useNavigate } from 'react-router';
import { faHome, faLeftLong, faFileCirclePlus, faUserAlt, faUserSecret, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { OverlayContext } from '../providers/OverlayProvider';
import React from 'react';
import { IconButton } from './IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AuthContext } from '../contexts/AuthContext';

export function useAuth() {
    const ctxt = React.useContext(AuthContext);
    if (ctxt == null) throw new Error('null context');
    return ctxt;
}
export function Window() {
    const { createInfoToast, createFailureToast, createSuccessToast, createWarningToast, createErrorToast } = React.useContext(ToasterContext)!;
    const { overlayAppendContent, overlayPopContent } = React.useContext(OverlayContext)!;
    /* {
        addInfoToast: ignore,
        addFailureToast: ignore, 
        addSuccessToast: ignore,
        addWarningToast: ignore,
        addErrorToast: ignore
    };
    */
    const location = useLocation();
    const navigate = useNavigate();
    const { isAuthenticated, email, logOut, logIn, register } = useAuth();
    const [isLoading, setIsLoading] = React.useState(false);
    return (
        <div className='flex flex-col w-full h-full text-4xl font-semibold tracking-wide border-2 shadow-2xl font-fira-sans bg-white-dark/60 rounded-xl shadow-blue'>
            <div className='top-bar'>
                <div className='btn-group'>
                    <IconButton title='Return to the home page.' size='1x' icon={faHome} className='btn-zinc-icon' onClick={() => navigate('/', { replace: true })} />
                    <IconButton className='btn-zinc' title='Go back one (1) page.' size='1x' icon={faLeftLong} onClick={() => navigate(-1)} />
                </div>
                <div className='btn-group'>
                    {isAuthenticated() && (
                        <div className='flex border-2 rounded-full border-white/50' title={email}>
                            <FontAwesomeIcon icon={faUserAlt} size='2x' className='object-contain text-white rounded-full bg-red' transform='shrink-2' />
                        </div>
                    )}
                    {!isAuthenticated() && (
                        <button
                            className='auth-btn'
                            onClick={async () => {
                                try {
                                    setIsLoading(true);
                                    const u = await logIn({ email: 'bobby.kalaf@junk-in-the-trunk.com', password: 'Achilles@92111' });
                                    setIsLoading(false);
                                    createSuccessToast(['Welcome back to JITT, ', email, '!'].join(''), `Logged in: ${u?.profile.email ?? 'n/a'}`);
                                } catch (error) {
                                    createErrorToast((error as Error).message, 'EXCEPTION', (error as Error).name);
                                    setIsLoading(false);
                                }
                            }}>
                            Log In
                        </button>
                    )}
                    {!isAuthenticated() && (
                        <button
                            className='auth-btn'
                            onClick={async () => {
                                try {
                                    setIsLoading(true);
                                    await register({ email: 'bobby.kalaf@junk-in-the-trunk.com', password: 'Achilles@92111' });
                                    setIsLoading(false);
                                    createSuccessToast('You have successfully signed up for JITT!', 'REGISTRATION SUCCESSFUL');
                                } catch (error) {
                                    createErrorToast((error as Error).message, 'EXCEPTION', (error as Error).name);
                                    setIsLoading(false);
                                }
                            }}>
                            Register
                        </button>
                    )}
                    {isAuthenticated() && (
                        <button
                            className='auth-btn'
                            onClick={() => {
                                try {
                                    logOut().then((x) => createSuccessToast('You have logged out; have a pleasant day!', 'SUCCESSFUL', 'Logged-out'));
                                } catch (error) {
                                    createErrorToast((error as Error).message, 'EXCEPTION', (error as Error).name);
                                    setIsLoading(false);
                                }
                            }}>
                            Log Out
                        </button>
                    )}
                    <button className='btn-blue' onClick={() => createInfoToast('Verbose informational message goes here.', 'INFORMATION', 'Verbose')}>
                        Info
                    </button>
                    <button className='btn-blue' onClick={() => createSuccessToast('Verbose informational message goes here.', 'SUCCESS', 'Item added!')}>
                        Success
                    </button>
                    <button className='btn-blue' onClick={() => createFailureToast('Verbose informational message goes here.', 'FAILURE', 'Did not succeed')}>
                        Failure
                    </button>
                    <button className='btn-blue' onClick={() => overlayAppendContent(<>CONTENT</>)}>
                        Append Overlay
                    </button>
                    <button className='btn-blue' onClick={() => overlayPopContent()}>
                        Pop Overlay
                    </button>
                </div>
            </div>
            <div className='tool-bar'>
                <div className='btn-group'>
                    <IconButton className='btn-zinc-icon' icon={faFileCirclePlus} size='1x' title='Insert a new record.' onClick={() => navigate('new')} />
                </div>
            </div>
            <main className='relative flex h-full text-base font-normal font-open-sans'>
                <section className='flex flex-grow m-0.5 border-2 border-white/50 shadow-lg shadow-black bg-zinc text-white px-2 py-1'>Interaction</section>
                <Toaster />
            </main>
            <div className='status-bar'>
                <span className='px-4 status-bar-item'>{location.pathname}</span>
                <CurrentUserEmail />
            </div>
        </div>
    );
}

export function CurrentUserEmail() {
    const { isAuthenticated, email } = useAuth();
    return isAuthenticated() ? <span className='px-4 status-bar-item'>{email}</span> : null;
}
