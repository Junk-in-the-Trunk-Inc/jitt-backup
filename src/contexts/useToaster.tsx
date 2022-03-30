import { ToasterContext } from './ToasterContext';


export function useToaster() {
    const ctxt = React.useContext(ToasterContext);
    if (ctxt == null)
        throw new Error('ToasterContext null');
    return ctxt;
}
