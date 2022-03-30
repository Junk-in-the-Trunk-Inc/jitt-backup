import { useCallback, cloneElement } from 'react';
import { generateRandomString } from '../common/string/generateRandomString';
import React from 'react';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { Toast, ToastType } from '../components/Toast';

export function useProviderToaster() {
    const toastMap = React.useRef(new Map<string, JSX.Element>());
    const addToMap = useCallback((key: string, item: JSX.Element) => {
        toastMap.current.set(key, item);
    }, []);
    const deleteFromMap = useCallback((key: string) => {
        toastMap.current.delete(key);
    }, []);
    const toasts = useCallback(() => Array.from(toastMap.current.values()), []);

    const appendToast = useCallback(
        (item: JSX.Element) => {
            const id = generateRandomString(24);
            const clone = cloneElement(item, { destroyToast: deleteFromMap, id, ...item.props });
            addToMap(id, clone);
        },
        [addToMap, deleteFromMap]
    );

    return { toasts, appendToast };
}

export function useProvideToasterComponent() {
    const [toasts, setToasts] = React.useState<JSX.Element[]>([]);
    const appendToast = useCallback((item: JSX.Element) => {
        setToasts((prev) => [...prev, item]);
    }, []);
    const destroyToast = useCallback((id: string) => {
        setToasts((prev) => [
            ...prev.map((x) => {
                return x != null ? (x.props.id === id ? (null as any) : x) : (null as any);
            })
        ]);
        setTimeout(() => setToasts((prev) => prev.filter((x) => x != null)), 1500);
    }, []);
    const createToast = useCallback(
        (body: string, title: string, icon: IconDefinition, subtitle?: string, type: ToastType = 'info') => {
            const id = generateRandomString(24);
            appendToast(<Toast type={type} key={id} body={body} title={title} subtitle={subtitle} icon={icon} finalizer={() => destroyToast(id)} id={id} />);
        },
        [appendToast, destroyToast]
    );
    return {
        toasts,
        createToast
    };
}
