/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { usePreventAndStop } from '../../hooks/usePreventAndStop';
import { Button } from '../Button';
import { useForm } from '../../hooks/useForm';
import { useNavigateBackOne } from '../../providers/useNavigateBackOne';
import { useCallback, useEffect, useMemo } from 'react';
import React from 'react';
import { defaultSuccess } from './MainRouter';
import { useCloneElement } from '../../hooks/useCloneElement';
import { useOverlay } from '../../hooks/useOverlay';
import { useWhyDidYou } from './useWhyDidYou';
import { useNavigate } from 'react-router';
import { useKeyPress } from "../../hooks/useKeyPress";
import { KEYS } from '../data/KEYS';

const getCols = (c: 2 | 3 | 4 | 5) => {
    switch (c) {
        case 2:
            return 'grid-cols-2';
        case 3:
            return 'grid-cols-3';
        case 4:
            return 'grid-cols-4';
        case 5:
            return 'grid-cols-5';
    }
};
const getSpan = (c: 2 | 3 | 4 | 5) => {
    switch (c) {
        case 2:
            return 'col-span-2';
        case 3:
            return 'col-span-3';
        case 4:
            return 'col-span-4';
        case 5:
            return 'col-span-5';
    }
};

export function useEventListener(event: string, listener: (ev: any) => void, source: {
    addEventListener(event: string, listener: (ev: any) => void): void;
    removeEventListener(event: string, listener: (ev: any) => void): void;
}) {
    useEffect(() => {
        source.addEventListener(event, listener);
        return () => source.removeEventListener(event, listener);
    }, [event, listener, source]);
}

export function Form<T extends Record<string, any>, U>(props: {
    name: string;
    children: Children;
    func: (x: T) => Promise<U>;
    toastExtractor: ToastExtractor | undefined;
    onSuccess: (result?: U) => void;
    initial: () => T;
    setFlag: () => void;
    cols: 2 | 3 | 4 | 5;
    className?: string;
    preSubmit?: (x: T, stateSetter: StateSetter<T>) => void;
}) {
    useWhyDidYou('Form', props);
    const { cols, name, initial, children, func, onSuccess, toastExtractor, setFlag, className, preSubmit } = props;
    const formID = `${name}-form`;
    const onSubmit = usePreventAndStop();
    const onReset = usePreventAndStop();
    const { popContent } = useOverlay();

    const { commit, getValue, setValue, provideFeedback, rollback, submit: submitBuilder, subscribe, validate } = useForm(initial, preSubmit);
    const submit = useMemo(() => submitBuilder(func, toastExtractor ?? defaultSuccess, onSuccess), [func, onSuccess, submitBuilder, toastExtractor]);
    const spread = useMemo(() => ({ getValue, setValue, provideFeedback, subscribe, validate }), [getValue, provideFeedback, setValue, subscribe, validate]);
    const childs = useCloneElement(children, spread);
    const onCancel = useCallback(() => {
        popContent();
    }, [popContent]);
    const onKeyDown = useKeyPress(KEYS.ESC, onCancel);
    useEffect(() => {
        return setFlag;
    }, [setFlag]);
    useEventListener('keydown', onKeyDown, document);
    return (
        <form className={`${className ?? ''} container grid ${getCols(cols)} p-2 border-2 border-black bg-yellow-minimal gap-x-4 gap-y-2`} id={formID} onSubmit={onSubmit} onReset={onReset}>
            <h2 className={`${getSpan(cols)} text-left text-white bg-black text-3xl p-0.5 rounded-md`}>Self Storage</h2>
            {childs}
            <footer className={`flex flex-row items-center justify-center ${getSpan(cols)} space-x-4`}>
                <Button className='px-8 py-1 mt-1 text-sm font-extrabold font-fira-sans' type='button' onClick={onCancel} label='Cancel' bg='bg-red-dark' text='text-white' border='border-black' />
                <Button className='px-8 py-1 mt-1 text-sm font-extrabold font-fira-sans' type='button' onClick={rollback} label='Reset' bg='bg-red-dark' text='text-white' border='border-black' />
                <Button className='px-8 py-1 mt-1 text-sm font-extrabold font-fira-sans' type='button' onClick={submit} label='Submit' bg='bg-red-dark' text='text-white' border='border-black' />
            </footer>
        </form>
    );
}
