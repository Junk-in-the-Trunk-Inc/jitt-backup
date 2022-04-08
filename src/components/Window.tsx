/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/unbound-method */
import { Toaster } from './Toaster';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { faFileCirclePlus, faUserSecret, faUserShield } from '@fortawesome/free-solid-svg-icons';
import React, { useContext } from 'react';
import { IconButton } from './IconButton';
import { OverlayContext } from '../contexts/OverlayContext';
import { useLeftSidebar } from '../hooks/useLeftSidebar';
import { TopBar } from './TopBar';
import { useAuth } from '../hooks/useAuth';
import { CurrentUserEmail } from './CurrentUserEmail';
import { LeftSidebar } from './LeftSidebar';
import { useAlerts } from '../hooks/useAlerts';
import { MainRouter } from './routing/MainRouter';

export function Window() {
    const { addErrorToast, addFailureToast, addInfoToast, addSuccessToast } = useAlerts();
    const { appendContent, popContent } = React.useContext(OverlayContext)!;
    /* {
        addInfoToast: ignore,
        addFailureToast: ignore, 
        addSuccessToast: ignore,
        addWarningToast: ignore,
        addErrorToast: ignore
    };
    */
    const location = useLocation();
    const { isAuthenticated, email, logOut, logIn, register } = useAuth();
    const [isLoading, setIsLoading] = React.useState(false);
    const { cycle } = useLeftSidebar();
    return (
        <div className='flex flex-col w-full h-full text-4xl font-semibold tracking-wide border-2 shadow-2xl font-fira-sans bg-white-dark/60 rounded-xl shadow-blue'>
            <TopBar
                createErrorToast={addErrorToast}
                createFailureToast={addFailureToast}
                createInfoToast={addInfoToast}
                createSuccessToast={addSuccessToast}
                email={email}
                logIn={logIn}
                logOut={logOut}
                register={register}
                isAuthenticated={isAuthenticated}
                overlayAppendContent={appendContent}
                overlayPopContent={popContent}
                setIsLoading={setIsLoading}
            />
            <div className='tool-bar'>
                {/* <div className='btn-group'>
                    <IconButton className='btn-zinc-icon' icon={faFileCirclePlus} size='1x' title='Insert a new record.' onClick={() => navigate('new')} />
                </div> */}
            </div>
            <main className='relative flex h-full text-base font-normal font-open-sans'>
                <LeftSidebar />
                <section className='flex flex-grow m-0.5 border-2 border-white/50 shadow-lg shadow-black bg-zinc text-white px-2 py-1 overflow-x-scroll'>
                    <MainRouter />
                </section>
                <Toaster />
            </main>
            <div className='status-bar'>
                <span className='px-4 status-bar-item'>{location.pathname}</span>
                <CurrentUserEmail />
            </div>
        </div>
    );
}

