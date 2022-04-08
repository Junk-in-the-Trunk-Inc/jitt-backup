import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition, SizeProp } from '@fortawesome/fontawesome-svg-core';
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../util/cn';
import { useWhyDidYou } from './routing/useWhyDidYou';

export function IconButton(props: {
    title?: string;
    icon: IconDefinition;
    size?: SizeProp;
    className?: string;
    border?: string;
    bg?: string;
    text?: string;
    fw?: boolean;
    bordered?: boolean;
    inverse?: boolean;
    onClick: React.ButtonHTMLAttributes<HTMLButtonElement>['onClick'];
}) {
    useWhyDidYou('IconButton', props);
    
    const { className: $className, title, icon, size, border, bg, fw, bordered, inverse, text, onClick } = props;
    const className = cn(
        {
            'inline-flex hover:bg-pink transition-all duration-1000 delay-150 rounded-lg ease-in-out font-semibold transform hover:scale-110 items-center justify-center ring ring-transparent focus:ring-cyan disabled:bg-neutral disabled:text-opacity-20 disabled:cursor-not-allowed tracking-wider leading-snug text-xl shadow-md border':
                true,
            [[border, bg, text].filter((x) => x != null).join(' ')]: true
        },
        $className ?? ''
    );
    return (
        <button className={className} onClick={onClick} type='button' title={title} tabIndex={0}>
            <FontAwesomeIcon inverse={inverse ?? false} border={bordered ?? false} className='' fixedWidth={fw ?? false} icon={icon} size={size} />
        </button>
    );
}

export function IconLinkButton({
    title,
    icon,
    size,
    to,
    className,
    ...remain
}: {
    title?: string;
    icon: IconDefinition;
    size?: SizeProp;
    to: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
    return (
        <Link to={to} className={`${className ?? ''} px-2`} {...remain} tabIndex={0} role='button'>
            <FontAwesomeIcon icon={icon} size={size} />
        </Link>
    );
}
