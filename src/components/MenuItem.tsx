import React from 'react';
import { Link } from 'react-router-dom';
import { kebabToTitleCase } from '../common/text/kebabToTitleCase';

export function MenuItem({ to, displayName }: { to: string; displayName?: string }) {
    const label = React.useMemo(() => displayName ?? kebabToTitleCase(to), []);
    return (
        <Link
            className='flex items-center justify-center text-lg px-1.5 font-bold text-center text-white transition duration-700 ease-out delay-300 transform border border-double rounded-lg shadow-md font-fira-sans border-black/80 bg-rose shadow-black ring-inset hover:ring-white hover:scale-110 hover:bg-yellow hover:text-black'
            to={to}>
            {label}
        </Link>
    );
}
