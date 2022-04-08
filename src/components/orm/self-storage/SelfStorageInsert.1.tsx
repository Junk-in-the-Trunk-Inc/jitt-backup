import { Control } from '../../data/Control';
import { InsertForm } from '../../data/InsertForm';
import { Input } from '../../data/Input';
import { initialSelfStorage, selfStorageInsertMutation } from './selfStorageOpts';

const createVariablesDefault = (fd: any) => ({ ...fd });

export function SelfStorageInsert() {
    return (
        <InsertForm collName='self-storage' initial={initialSelfStorage} mutation={selfStorageInsertMutation} createVariables={createVariablesDefault}>
            <Control name='name' label='Name' Component={Input} required type='text' placeholder='Enter text...' />
            <Control name='website' label='Website' Component={Input} type='url' placeholder='Enter text...' />
        </InsertForm>
    );
}
