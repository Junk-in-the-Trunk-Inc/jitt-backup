import React, { useMemo } from 'react';

export const Select = React.forwardRef(function (
    props: { options?: Record<string, string>; size?: number } & Partial<React.SelectHTMLAttributes<HTMLSelectElement>>,
    ref: React.ForwardedRef<HTMLSelectElement>
) {
    const { options, size: $size, ...remain } = props;
    const size = useMemo(() => $size ?? 3, [$size]);
    return (
        <select ref={ref} size={size} {...remain}>
            {[['', 'Make a selection...'], ...Object.entries(options ?? {})].map(([k, v]) => (
                <option value={k} label={v} key={k} />
            ))}
        </select>
    );
});
