import React from 'react';
import { NavLink } from 'react-router-dom';
import { kebabToTitleCase } from './kebabToTitleCase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTable } from '@fortawesome/free-solid-svg-icons';

export function ActiveClass({ to, displayName }: { to: string; displayName?: string }) {
    const label = displayName ?? kebabToTitleCase(to.split('/').reverse()[0]);
    return (
        <li className=''>
            <NavLink
                className={({ isActive }) => {
                    return isActive
                        ? 'bg-yellow text-black font-fira-sans text-base font-medium w-full border border-black shadow-md shadow-red-dark ring-inset ring-red whitespace-pre  space-x-1 grid grid-cols-2 grid-rows-1'
                        : 'bg-sky-dark text-white font-fira-sans text-base font-medium w-full border border-black shadow-md shadow-blue-dark whitespace-pre  space-x-1 grid grid-cols-4 grid-rows-1';
                }}
                to={to}>
                <FontAwesomeIcon icon={faTable} size='1x' listItem className='col-auto'/>
                <span className='col-span-3'>{label}</span>
            </NavLink>
        </li>
    );
}
