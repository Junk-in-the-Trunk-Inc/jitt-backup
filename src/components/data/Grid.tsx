import { DocumentNode, useQuery } from '@apollo/client';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { distinct } from '../../common/array/distinct';
import { useEventListener } from '../routing/Form';
import { KEYS } from './KEYS';

// eslint-disable-next-line @typescript-eslint/ban-types

export function Grid<T extends { _id: string }, TData extends Record<string, T[]>>(props: {
    query: DocumentNode;
    Row: React.FunctionComponent<{ x: T; clearSelected: () => void; isSelected: (s: string) => boolean; onClick: (ev: React.MouseEvent<HTMLElement, MouseEvent>) => void }>;
    // eslint-disable-next-line @typescript-eslint/ban-types
    Headers: React.FunctionComponent<{}>;
    propName: string;
}) {
    const { query, Row, Headers, propName } = props;
    const { loading, error, data, refetch } = useQuery<TData>(query, { });
    const [selectedRows, setSelectedRows] = useState<string[]>([]);
    const addToList = useCallback((item: string) => {
        setSelectedRows((prev) => distinct([...prev, item]));
    }, []);
    const removeFromList = useCallback((item: string) => {
        setSelectedRows((prev) => [...prev.filter((x) => x !== item)]);
    }, []);
    const overwriteList = useCallback((item: string) => {
        setSelectedRows([item]);
    }, []);
    const clearSelected = useCallback(() => {
        setSelectedRows([]);
    }, []);
    const includes = useCallback(
        (item: string) => {
            return selectedRows.includes(item);
        },
        [selectedRows]
    );
    const onClick = useCallback(
        (id: string) => {
            return (ev: React.MouseEvent<HTMLElement>) => {
                const { ctrlKey, shiftKey } = ev;
                const isInList = includes(id) ? true : false;
                if (ctrlKey || shiftKey) {
                    if (!isInList) addToList(id);
                } else {
                    if (isInList) removeFromList(id);
                    else overwriteList(id);
                }
            };
        },
        [addToList, includes, overwriteList, removeFromList]
    );
    const onKeyDown = useCallback(
        (ev: React.KeyboardEvent) => {
            if (ev.key === KEYS.ESC) {
                clearSelected();
            }
        },
        [clearSelected]
    );
    useEventListener('keydown', onKeyDown, document);
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        const searchParams = new URLSearchParams();
        if (selectedRows.length === 0) {
            return navigate(`${location.pathname}`);
        }
        searchParams.set('selected', JSON.stringify(selectedRows));
        navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
    }, [location.pathname, navigate, selectedRows]);
    if (loading) {
        return <FontAwesomeIcon className='absolute flex items-center justify-center w-screen h-screen text-blue-dark pointer-events none' icon={faSpinner} spin size='10x' />;
    }
    if (error) {
        return <div>{error.message}</div>;
    }
    return (
        <div className='container'>
            <table>
                <thead>
                    <Headers />
                </thead>
                <tbody>
                    {(data != null ? data[propName] ?? [] : []).map((x) => {
                        console.log('data', data);
                        console.log('data[propName]', (data as any)[propName]);
                        console.log('x', x);
                        return <Row clearSelected={clearSelected} isSelected={includes} onClick={onClick(x._id)} x={x} key={x._id} />;
                    })}
                </tbody>
            </table>
        </div>
    );
}
