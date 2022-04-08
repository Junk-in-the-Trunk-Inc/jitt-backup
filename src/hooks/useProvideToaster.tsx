import { cloneElement, useCallback } from 'react';
import { generateRandomString } from '../common/string/generateRandomString';
import React from 'react';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { Toast, ToastType } from '../components/Toast';

export function useProvideToaster() {
    const [toasts, setToasts] = React.useState<JSX.Element[]>([]);
    const appendToast = useCallback((item: JSX.Element) => {
        setToasts((prev) => [...prev, cloneElement(item, { ...item.props, key: generateRandomString(10) })]);
    }, []);
    const destroyToast = useCallback((id: string) => {
        setToasts((prev) => [
            ...prev.map((x) => {
                return x != null ? (x.props.id === id ? (null as any) : x) : (null as any);
            }).filter(x => x != null)
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
