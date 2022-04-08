import React, { useMemo } from 'react';
import { DocumentNode, useQuery } from '@apollo/client';
import { Select } from './Select';

export const Lookup = React.forwardRef(function (
    props: { query?: DocumentNode; propName?: string; dataObjectPropName?: string } & Partial<React.SelectHTMLAttributes<HTMLSelectElement>>,
    ref: React.ForwardedRef<HTMLSelectElement>
) {
    const { query, propName, dataObjectPropName, ...remain } = props;
    if (query == null) throw new Error('bad query');
    const { error, loading, data } = useQuery(query);

    const options = useMemo(
        () =>
            ((data ?? {})[dataObjectPropName ?? ''] ?? [])
                .map((item: any) => {
                    const value = item[propName ?? ''];
                    const _id = item._id;
                    return { [_id]: value };
                })
                .reduce((pv: any, cv: any) => ({ ...pv, ...cv }), {}),
        [data, dataObjectPropName, propName]
    );
    if (loading)
        return (
            <select ref={ref}>
                <option value='n/a' label='Loading options...'></option>
            </select>
        );
    if (error) return <div>Error: ${error.message}</div>;

    return <Select ref={ref} options={options} {...remain}></Select>;
});
