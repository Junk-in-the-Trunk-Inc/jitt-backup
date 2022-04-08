/* eslint-disable @typescript-eslint/unbound-method */
import React from 'react';
import { ignore } from '../common/ignore';
import { generateRandomString } from '../common/string/generateRandomString';
import { useToggler } from './useToggler';
import { getProperty } from '../obj/getProperty';
import { setProperty } from '../obj/setProperty';
import { Result } from '../types/Result';
import { useAlerts } from './useAlerts';
import { useOnMount } from './useOnMount';
// import { ToasterContext } from './ToasterContext';

// export type IFormContext<T> = {
//     getValue(name: string): () => string;
//     setValue(name: string): (value: any) => void;
//     provideFeedback: boolean;
//     validate: (inputRef: React.RefObject<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, ...validators: Array<(input: string) => Result<string>>) => () => Result<string>;
//     subscribe: (cb: () => Result<string>) => () => void;
//     commit: () => void;
//     rollback: () => void;
//     submit: <U>(
//         func: (x: T) => Promise<U>,
//         action: undefined | ((result?: U | Error) => { body: string; title?: string; subtitle?: string }) | { body: string; title?: string; subtitle?: string },
//         onSuccess: (result?: U) => void
//     ) => () => void;
// };


export function useForm<T extends Record<string, any>>(initial: () => T, preSubmit: (x: T, stateSetter: StateSetter<T>) => void = ignore) {
    const { addFailureToast, addSuccessToast } = useAlerts();
    const [formData, setFormData] = React.useState(initial);
    const memoized = React.useRef<T | undefined>(undefined);
    useOnMount(() => {
        memoized.current = formData;
    });
    const getValue = React.useCallback(
        (name: string) => {
            return () => getProperty(name)(formData);
        },
        [formData]
    );
    const setValue = React.useCallback((name: string) => {
        return (value: any) => setFormData((prev) => setProperty(name, prev)(value));
    }, []);
    const commit = React.useCallback(() => {
        memoized.current = formData;
    }, [formData]);
    const rollback = React.useCallback(() => {
        if (memoized.current == null) return;
        setFormData(memoized.current);
    }, []);
    const controls = React.useRef<Map<string, () => Result<string>>>(new Map());
    const unsubscribe = React.useCallback((key: string) => {
        return () => {controls.current.delete(key);}
    }, []);
    const subscribe = React.useCallback(
        (func: () => Result<string>) => {
            const key = generateRandomString(24);
            controls.current.set(key, func);
            return unsubscribe(key);
        },
        [unsubscribe]
    );
    const validate = React.useCallback(
        (inputRef: React.RefObject<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, ...validators: Array<(input: string) => Result<string>>): (() => Result<string>) => {
            return () => {
                if (inputRef.current == null) return Result.fail('Bad ref');
                const customValidation = validators.reduce(
                    (pv, cv) => (value: string) => Result.combine(pv(value), cv(value)),
                    (v) => Result.pass(v)
                )(inputRef.current.value);
                inputRef.current.setCustomValidity(Result.isPass(customValidation) ? '' : customValidation.value.join('\n'));
                return inputRef.current.validity.valid ? Result.pass(inputRef.current.value) : Result.fail(inputRef.current.validationMessage);
            };
        },
        []
    );
    const [provideFeedback, showFeedback, hideFeedback] = useToggler(false);
    const submit = React.useCallback(
        function <V extends T, U>(
            func: (x: V) => Promise<U>,
            action?: ((result?: U | Error) => { body: string; title?: string; subtitle?: string }) | { body: string; title?: string; subtitle?: string },
            onSuccess: (result?: U) => void = ignore
        ) {
            return () => {
                if (preSubmit != null) preSubmit(formData, setFormData);
                hideFeedback();
                const c = Array.from(controls.current.values()).reduce((pv, cv) => {
                    return Result.combine(pv, cv());
                }, Result.pass(''));
                try {
                    if (Result.isPass(c)) {
                        func(formData as V).then((r) => {
                            commit();
                            const { body, subtitle, title } = action == null ? { body: '', subtitle: undefined, title: undefined } : typeof action === 'function' ? action(r) : action;
                            addSuccessToast(body, subtitle, title);
                            onSuccess(r);
                        });
                    } else {
                        throw new Error(c.value.join('\n'));
                    }
                } catch (error) {
                    const e = error as Error;
                    showFeedback();
                    console.error(e.message);
                    const { body, subtitle, title } = action == null ? { body: e.message, title: 'FAILURE', subtitle: undefined } : typeof action === 'function' ? action(e) : action;
                    addFailureToast(body, subtitle, title);
                }
            };
        },
        [addFailureToast, addSuccessToast, commit, formData, hideFeedback, showFeedback]
    );
    return { validate, subscribe, commit, rollback, getValue, setValue, provideFeedback, submit };
}
