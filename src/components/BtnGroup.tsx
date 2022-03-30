import React from 'react';

export function BtnGroup({ children, className, ...remain }: { children: Children } & Partial<React.HTMLAttributes<HTMLDivElement>>) {
    return <div className={[className, 'btn-group'].join(' ')}>{children}</div>;
}
