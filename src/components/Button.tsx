import React, { ButtonHTMLAttributes, useMemo } from 'react';
import { cn } from '../util/cn';
import { useWhyDidYou } from './routing/useWhyDidYou';

export function Button(
    props: {
        label: React.ReactNode;
        title?: string;
        bg?: string;
        border?: string;
        text?: string;
    } & Partial<ButtonHTMLAttributes<HTMLButtonElement>>
) {
    useWhyDidYou('Button', props);
    const { label, bg, border, text, className: $classname, onClick,...remain } = props;
    const className = useMemo(
        () =>
            cn(
                {
                    'flex hover:bg-pink transition-all duration-1000 delay-150 rounded-lg ease-in-out font-semibold transform hover:scale-110 items-center justify-center ring ring-transparent focus:ring-cyan disabled:bg-neutral disabled:text-opacity-20 disabled:cursor-not-allowed tracking-wider leading-snug text-xl shadow-md border':
                        true,
                    [[bg, border, text].filter((x) => x != null).join(' ')]: true
                },
                $classname ?? ''
            ),
        [$classname, bg, border, text]
    );
    return (
        <button className={className} tabIndex={0} onClick={onClick} {...remain}>
            {label}
        </button>
    );
}
