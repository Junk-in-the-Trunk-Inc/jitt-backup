/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useOverlay } from '../../hooks/useOverlay';
import React, { useCallback, useEffect, useMemo } from 'react';
import { Form } from '../routing/Form';
import { ignore } from '../../common/ignore';
import { useNavigate } from 'react-router';
import { useWhyDidYou } from '../routing/useWhyDidYou';
import { DocumentNode, useMutation } from '@apollo/client';
import { ObjectId } from 'bson';
import { extract } from '../orm/self-storage/selfStorageOpts';

export function InsertForm<T extends Record<string, any>>(props: {
    children: Children;
    initial: () => T;
    preSubmit?: (x: T, setState: StateSetter<T>) => void;
    mutation: DocumentNode;
    collName: string;
    cols?: 2 | 3 | 4 | 5;
    'data-name'?: string;
    createVariables: (fd: T) => Record<string, any>
}) {
    useWhyDidYou('InsertForm', props);
    const { children, cols, initial, mutation, collName, preSubmit, 'data-name': dataName, createVariables } = props;
    const [insert] = useMutation(mutation);
    const func = useCallback(
        async (fd: T) => {
            const result = await insert({ variables: createVariables(fd) });
            return result.data._id as string;
        },
        [createVariables, insert]
    );
    const { appendContent } = useOverlay();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    // const element = <form onSubmit={ignore} onReset={ignore} className='grid grid-col-2'></form>;
    const navigate = useNavigate();
    const setFlag = useCallback(() => {
        navigate('./..');
    }, [navigate]);
    const toastExtractor = useMemo(() => extract(collName), [collName]);
    useEffect(() => {
        appendContent(
            <Form
                cols={cols ?? 2}
                name={`${collName}-insert`}
                initial={initial as any}
                preSubmit={preSubmit as any}
                func={func}
                onSuccess={ignore}
                setFlag={setFlag}
                toastExtractor={toastExtractor}
                className='text-sm font-semibold text-black'>
                {children}
            </Form>
        );
    }, []);
    return <span role='button' className='hidden' onClick={setFlag} />;
}
