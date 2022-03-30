import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition, SizeProp } from '@fortawesome/fontawesome-svg-core';
import React from 'react';

export function IconButton({
    className,
    title,
    icon,
    size,
    onClick
}: {
    title?: string;
    icon: IconDefinition;
    size?: SizeProp;
    className?: string;
    onClick: React.ButtonHTMLAttributes<HTMLButtonElement>['onClick'];
}) {
    return (
        <button className={className} onClick={onClick} type='button' title={title} tabIndex={0}>
            <FontAwesomeIcon className='inline-flex btn-icon' icon={icon} size={size} />
        </button>
    );
}
