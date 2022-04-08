import React from 'react';
import { ActiveClass } from './ActiveClass';
import { kebabToTitleCase } from '../common/text/kebabToTitleCase';

export function NavigationGrouping({ to }: { to: string }) {
    return (
        <summary className='w-full text-base font-medium text-white border-2 shadow-md bg-slate-very-dark font-fira-sans indent-4 border-cyan shadow-blue-dark group-open:bg-rose-dark group-open:text-white'>
            {kebabToTitleCase(to)}
        </summary>
    );
}
export function NavigationTree() {
    return (
        <>
            <details className='group'>
                <NavigationGrouping to='auctions' />
                <ol className='fa-ul'>
                    <ActiveClass key={0} to='/data/v1/self-storage' />
                    <ActiveClass key={1} to='/data/v1/facility' />
                    <ActiveClass key={4} to='/data/v1/rental-unit' />
                    <ActiveClass key={2} to='/data/v1/auction-lot' />
                    <ActiveClass key={3} to='/data/v1/auction-site' />
                </ol>
            </details>
            <details>
                <summary className='w-full text-base font-medium text-white border shadow-md bg-slate-very-dark font-fira-sans indent-2 border-cyan shadow-blue-dark open:bg-violet open:text-black group-open:bg-rose-dark group-open:text-white'>
                    Products
                </summary>
                <ol>
                    <ActiveClass key={0} to='brand' />
                    <ActiveClass key={1} to='product' />
                </ol>
            </details>
        </>
    );
}
