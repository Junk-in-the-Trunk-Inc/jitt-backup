/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { cn } from '../util/cn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useToggler } from '../hooks/useToggler';
import { generateRandomString } from '../common/string/generateRandomString';

export type ToastType = 'success' | 'failure' | 'error' | 'info' | 'warning';

export const cataToastType = function <T>(ifSuccess: T, ifFailure: T, ifError: T, ifInfo: T, ifWarning: T) {
    return (tt: ToastType) => {
        switch (tt) {
            case 'success':
                return ifSuccess;
            case 'failure':
                return ifFailure;
            case 'error':
                return ifError;
            case 'info':
                return ifInfo;
            case 'warning':
                return ifWarning;
        }
    };
};

const forToastIcon = cataToastType('bg-green-dark/80 text-white', 'bg-red-dark/80 text-white', 'bg-lime-dark/80 text-white', 'bg-blue-dark/80 text-white', 'bg-orange-dark/80 text-white');
const forToastBorder = cataToastType('border-emerald-very-dark/80', 'border-red-very-dark/80', 'border-green-very-dark/80', 'border-blue-very-dark/80', 'border-amber-very-dark/80');
const forDivide = cataToastType('divide-emerald-very-dark/80', 'divide-red-very-dark/80', 'divide-green-very-dark/80', 'divide-blue-very-dark/80', 'divide-amber-very-dark/80');
const forTitle = cataToastType(
    'bg-emerald/80 text-white font-fira-sans font-semibold text-xl tracking-wide leading-loose flex w-full text-center items-center justify-center',
    'bg-red/80 text-white font-fira-sans font-semibold text-xl tracking-wide leading-loose flex w-full text-center items-center justify-center',
    'bg-green/80 text-white font-fira-sans font-semibold text-xl tracking-wide leading-loose flex w-full text-center items-center justify-center',
    'bg-blue/80 text-white font-fira-sans font-semibold text-xl tracking-wide leading-loose flex w-full text-center items-center justify-center',
    'bg-amber/80 text-white font-fira-sans font-semibold text-xl tracking-wide leading-loose flex w-full text-center items-center justify-center'
);
const forSubtitle = cataToastType(
    'bg-black font-semibold font-fira-sans text-base leading-snug tracking-wide flex text-center w-full flex before:content-["__"] whitespace-pre',
    'bg-black font-semibold font-fira-sans text-base leading-snug tracking-wide flex text-center w-full flex before:content-["__"] whitespace-pre',
    'bg-black font-semibold font-fira-sans text-base leading-snug tracking-wide flex text-center w-full flex before:content-["__"] whitespace-pre',
    'bg-black font-semibold font-fira-sans text-base leading-snug tracking-wide flex text-center w-full flex before:content-["__"] whitespace-pre',
    'bg-black font-semibold font-fira-sans text-base leading-snug tracking-wide flex text-center w-full flex before:content-["__"] whitespace-pre'
);
const forBody = cataToastType(
    'p-0.5 bg-emerald-very-light/80 text-black font-fira-sans before:content-["__"] text-left tracking-tight leading-snug text-base font-normal whitespace-normal',
    'p-0.5 bg-red-very-light/80 text-black font-fira-sans before:content-["__"] text-left tracking-tight leading-snug text-base font-normal whitespace-normal',
    'p-0.5 bg-green-very-light/80 text-black font-fira-sans before:content-["__"] text-left tracking-tight leading-snug text-base font-normal whitespace-normal',
    'p-0.5 bg-blue-very-light/80 text-black font-fira-sans before:content-["__"] text-left tracking-tight leading-snug text-base font-normal whitespace-normal',
    'p-0.5 bg-amber-very-light/80 text-black font-fira-sans before:content-["__"] text-left tracking-tight leading-snug text-base font-normal whitespace-normal'
);

export function Toast({
    title,
    subtitle,
    body,
    icon,
    type,
    bgColor,
    textColor,
    id,
    finalizer
}: {
    title: string;
    subtitle?: string;
    body?: string;
    icon: IconDefinition;
    type: ToastType;
    bgColor?: string;
    textColor?: string;
    finalizer: () => void;
    id: string;
}) {
    const [isAnimating, setIsAnimating] = React.useState(true);
    const [disposing, dispose, stopDispose, toggleDispose] = useToggler(false);
    const outerCn = cn(
        {
            'bg-purple text-black w-full h-auto justify-center items-center flex': type === 'info',
            'bg-green text-black w-full h-full justify-center items-center flex': type === 'success',
            'bg-red text-black w-full h-full justify-center items-center flex': type === 'failure',
            'bg-rose text-black w-full h-full justify-center items-center flex': type === 'error',
            'bg-amber text-black w-full h-full justify-center items-center flex': type === 'warning',
            [forToastBorder(type)]: true,
            [forDivide(type)]: true,
            bounceInDown: isAnimating && !disposing,
            fadeOutRight: isAnimating && disposing,
            hidden: disposing && !isAnimating
        },
        'grid grid-cols-5 grid-rows-1 w-full h-auto mt-2 border-4 place-content-center shadow-blue-dark shadow-lg text-white border-black'
    );

    const headerClassName = cn(
        {
            'info-toast-header': type === 'info',
            'success-toast-header': type === 'success',
            'failure-toast-header': type === 'failure',
            'error-toast-header': type === 'error',
            'warning-toast-header': type === 'warning'
        },
        'flex w-full justify-center items-center'
    );
    const subHeaderClassName = cn(
        {
            'info-toast-subheader': type === 'info',
            'success-toast-subheader': type === 'success',
            'failure-toast-subheader': type === 'failure',
            'error-toast-subheader': type === 'error',
            'warning-toast-subheader': type === 'warning'
        },
        'flex w-full justify-center items-center'
    );
    const bodyClassName = cn(
        {
            'info-toast-body': type === 'info',
            'success-toast-body': type === 'success',
            'failure-toast-body': type === 'failure',
            'error-toast-body': type === 'error',
            'warning-toast-body': type === 'warning'
        },
        'flex w-full justify-center items-center'
    );
    const iconClassName = cn(
        {
            'bg-red': type === 'failure',
            'bg-blue': type === 'info',
            'bg-green': type === 'success',
            'bg-orange': type === 'warning',
            'bg-magenta': type === 'error'
        },
        'flex w-full text-black font-fira-sans font-bold items-center'
    );
    const onAnimationEnd = React.useCallback(() => {
        if (disposing) {
            finalizer();
        } else {
            setIsAnimating(false);
        }
    }, [disposing, finalizer]);
    const cb = React.useRef<NodeJS.Timeout | null>(null);
    React.useEffect(() => {
        if (!isAnimating) {
            if (cb.current == null) {
                cb.current = setTimeout(() => {
                    dispose();
                }, 12000);
                return () => {
                    if (cb.current == null) return;
                    clearTimeout(cb.current);
                    cb.current = null;
                };
            }
        }
    }, [dispose, isAnimating]);
    React.useEffect(() => {
        if (disposing) {
            setIsAnimating(true);
        }
    }, [disposing]);
    const onClick = React.useCallback(() => {
        if (cb.current) clearTimeout(cb.current);
        dispose();
    }, [dispose]);
    const ID = generateRandomString(24);
    const bodyID = [ID, 'body'].join('-');
    return (
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
        <div
            role='alert'
            className={outerCn}
            onAnimationEnd={onAnimationEnd}
            onClick={onClick}>
            <div className={`flex items-center justify-center w-full h-full place-content-center ${forToastIcon(type)} ${forToastBorder(type)}`}>
                <FontAwesomeIcon className='flex flex-grow object-cover stroke-1 place-self-center fill-black stroke-black' size='3x' icon={icon} />
            </div>
            <section aria-describedby={bodyID} className={`w-full h-auto flex flex-col border-4 rounded-md col-span-4 ${forToastBorder(type)}`}>
                <div className={'flex flex-col justify-self-start w-full h-auto'}>
                    <h1 className={forTitle(type)}>{title}</h1>
                    <p className={forSubtitle(type)}>{subtitle}</p>
                </div>
                <p id={bodyID} className={`flex flex-grow justify-start ${forBody(type)} m-0.5`} >{body}</p>
            </section>
        </div>
    );
}
