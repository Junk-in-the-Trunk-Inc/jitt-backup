import { faAsterisk } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Result } from '../../types/Result';
import { useWhyDidYou } from '../routing/useWhyDidYou';
import { BaseControlElement } from '../orm/self-storage/selfStorageOpts';

export type FormProvided = {
    validate: (inputRef: React.RefObject<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, ...validators: ((input: string) => Result<string>)[]) => () => Result<string>;
    subscribe: (func: () => Result<string>) => () => void;
    getValue: (name: string) => () => any;
    setValue: (name: string) => (value: any) => void;
    provideFeedback: boolean;
};



export function Control<TElement extends HTMLElement, TAttributes extends React.HTMLAttributes<TElement>>(
    props: { name: string; label: string; validators?: Array<(s: string) => Result<string>>; Component: BaseControlElement<TElement, TAttributes> } & Partial<FormProvided> & Partial<TAttributes>
) {
    useWhyDidYou('Control', props);
    const { name, label, Component, validate, subscribe, getValue, setValue, provideFeedback, validators, ...remain } = props;
    const labelID = `${name}-label`;
    const inputID = `${name}-input`;
    const feedbackID = `${name}-feedback`;
    const [feedback, setFeedback] = useState('');
    if (getValue == null || setValue == null || validate == null || subscribe == null) throw new Error('form parts null');
    const value = useMemo(() => getValue(name), [getValue, name]);
    const ref = useRef<DataEntryElements>(null);
    const onChange = React.useCallback(
        (ev: React.ChangeEvent<DataEntryElements>) => {
            setValue(name)(ev.target.value);
        },
        [name, setValue]
    );
    const checkValidity = useCallback(() => {
        const result = validate(ref, ...(validators ?? []))();
        if (Result.isFail(result)) setFeedback(result.value.join('\n'));
        else setFeedback('');
        return result;
    }, [validate, validators]);
    useEffect(() => {
        return subscribe(checkValidity);
    }, [checkValidity, subscribe]);
    return (
        <div className='relative flex flex-col'>
            <label id={labelID} htmlFor={inputID} className='flex ml-3 text-base font-bold'>
                {label}
            </label>
            <Component
                id={inputID}
                name={name}
                aria-errormessage={feedbackID}
                aria-labelledby={labelID}
                className='flex pl-2 text-sm font-normal text-white border rounded-md shadow-md bg-sky-light border-blue-dark font-fira-sans shadow-black peer'
                onChange={onChange}
                value={value()}
                ref={ref}
                {...(remain as any as Partial<TAttributes>)}
            />

            <FontAwesomeIcon title='This field is required.'  icon={faAsterisk} size='lg' className='absolute right-0 invisible  text-red bg-black h-6 w-6 peer-required:visible py-0.5 rounded-lg shadow-md shadow-blue' />

            {provideFeedback && (
                <small id={feedbackID} className='flex text-base font-medium text-center text-red font-fira-sans'>
                    {feedback}
                </small>
            )}
        </div>
    );
}
