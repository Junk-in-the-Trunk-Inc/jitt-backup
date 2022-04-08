import React from 'react';
import { FormProvided } from './Control';
import { useCloneElement } from '../../hooks/useCloneElement';


export function Fieldset(props: { children: Children; legend: string; } & Partial<FormProvided>) {
    const { children, legend, ...remain } = props;
    const newChildren = useCloneElement(children, remain);
    return (
        <fieldset className='grid grid-cols-3 col-span-4 gap-x-4 gap-y-2 bg-amber-light'>
            <legend>{legend}</legend>
            {newChildren}
        </fieldset>
    );
}
