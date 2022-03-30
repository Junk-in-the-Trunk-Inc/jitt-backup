import { ToasterContext } from '../providers/ToasterProvider';

export function Toaster() {
    const { toasts } = React.useContext(ToasterContext)!;
    console.log('toasts', toasts);
    return <div className='absolute top-0 flex flex-col-reverse items-center w-1/5 h-full left-2/3'>{toasts}</div>;
}
