/* eslint-disable @typescript-eslint/no-misused-promises */
import { ToastCtor } from '../providers/ToasterProvider';
import { Navigate, Outlet, Route, Routes, useNavigate } from 'react-router';
import { faHome, faLeftLong, faTrash, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import React, { useCallback, useMemo } from 'react';
import { IconButton, IconLinkButton } from './IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MenuItem } from './MenuItem';
import { Link, NavLink } from 'react-router-dom';
import { DataTree } from './DataTree';
import { BtnGroup } from './BtnGroup';
import { faFileCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { useWhyDidYou } from './routing/useWhyDidYou';
import { useNavigateBackOne } from '../providers/useNavigateBackOne';
import { useLocation } from 'react-router';
import { ignore } from '../common/ignore';
import { gql, useMutation } from '@apollo/client';
import { useParams } from 'react-router';
import { capitalize } from '../common/text/capitalize';

export function pluralize(s: string) {
    if (s.endsWith('y')) {
        return s.replace('y', 'ies');
    }
    return s.concat('s');
}
export function DeleteButton(props: { selected: string[] }) {
    const { type } = useParams();
    const script = `mutation Delete($ids: [ObjectId]) {
            deleteMany${capitalize(pluralize((type ?? '').replace('-', '') ?? ''))}(query: { _id_in: $ids }) {
                deletedCount
            }
        }`;
    const deleteMutation = gql(script);
    const [execute, { error, data, loading }] = useMutation(deleteMutation);
    return (
        <IconButton
            className='px-2 btn-zinc-icon'
            size='1x'
            icon={faTrash}
            onClick={() => {
                console.log('selected', props.selected);
                console.log('location', location);
                const searchParams = new URLSearchParams(location.hash.replace('#', '').split('?')[1]);
                return execute({ variables: { ids: JSON.parse(searchParams.get('selected') ?? '[]') } });
            }}
        />
    );
}
export function TopBar(props: {
    isAuthenticated: () => boolean;
    setIsLoading: StateSetter<boolean>;
    logIn: (creds: { email: string; password: string }) => Promise<Realm.User | null>;
    register: (creds: { email: string; password: string }) => Promise<void>;
    logOut: () => Promise<void>;
    email: string;
    createSuccessToast: ToastCtor;
    createErrorToast: ToastCtor;
    createFailureToast: ToastCtor;
    createInfoToast: ToastCtor;
    overlayAppendContent: (item: JSX.Element) => void;
    overlayPopContent: () => void;
}) {
    useWhyDidYou('Topbar', props);
    const { isAuthenticated, logIn, email, setIsLoading, createErrorToast, createSuccessToast, createFailureToast, createInfoToast, overlayAppendContent, overlayPopContent, logOut, register } = props;
    const navigate = useNavigate();
    const homeClick = useCallback(() => navigate('/', { replace: true }), [navigate]);
    const goBackClick = useNavigateBackOne();
    const location = useLocation();
    const hasSelection = useMemo(() => (location.search.length > 0 ? location.search.includes('selected') : false), [location.search]);

    return (
        <div className='top-bar'>
            <div className='btn-group'>
                <IconButton title='Return to the home page.' size='1x' icon={faHome} className='btn-zinc-icon px-3 py-1.5' onClick={homeClick} />
                <IconButton className='btn-zinc-icon  px-3 py-1.5' title='Go back one (1) page.' size='1x' icon={faLeftLong} onClick={goBackClick} />
            </div>
            <div className='grid grid-cols-8 p-0.5 gap-x-3 justify-start'>
                <Routes>
                    <Route path='dashboard'>
                        <Route index element={<>Dashboard</>} />
                    </Route>
                    <Route path='api'></Route>
                    <Route path='data'>
                        <Route path='v1' element={<Outlet />}>
                            <Route
                                path=':type'
                                element={
                                    <BtnGroup className='flex justify-start flex-grow pl-1 space-x-1'>
                                        <Outlet />
                                    </BtnGroup>
                                }>
                                <Route path='new' element={<></>} />
                                <Route
                                    index
                                    element={
                                        <>
                                            <IconLinkButton className=' btn-zinc-icon' size='1x' icon={faFileCirclePlus} to='new' />
                                            {hasSelection && <DeleteButton selected={JSON.parse(new URLSearchParams().get('selection') ?? '[]')} />}
                                        </>
                                    }
                                />
                            </Route>
                            <Route index element={<DataTree />} />
                        </Route>
                        <Route index element={<Navigate to='v1' />} />
                    </Route>
                    <Route
                        path='/'
                        element={
                            <>
                                <MenuItem to='dashboard' />
                                <MenuItem to='api' displayName='API' />
                                <MenuItem to='data' />
                                <MenuItem to='files' />
                                <MenuItem to='reports' />
                                <MenuItem to='queues' />
                            </>
                        }
                    />
                    <Route path='*' element={<Navigate to='/' />} />
                </Routes>
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
    );
}
