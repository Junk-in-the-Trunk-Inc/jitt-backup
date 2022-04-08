import React, { useCallback, useMemo, useState } from 'react';
import { Control } from '../../data/Control';
import { InsertForm } from '../../data/InsertForm';
import { Input } from '../../data/Input';
import { Lookup } from '../../data/Lookup';
import { Fieldset } from '../../data/Fieldset';
import { selfStorageDropDownOptions } from '../self-storage/selfStorageOpts';
import { Select } from '../../data/Select';
import { provinceMap } from '../../../data/Provinces';
import { countryMap } from '../../../data/CountryISO2';
import { FacilityDTO } from "./FacilityDTO";
import { facilityInitial, facilityInsert } from './facilityOpts';

const createVariables = (fd: FacilityDTO) => ({ name: fd.name, phoneNumber: fd.phoneNumber, email: fd.email, facilityNumber: fd.facilityNumber, ...fd.address, _id: fd._id, selfStorage: fd.selfStorage });
// TODO add read-only indicator / calculated indicator
export function FacilityInsertForm() {
    const [nameParts, setNameParts] = useState<{ selfStorage?: string; city?: string; state?: string; street?: string }>({
        selfStorage: undefined,
        city: undefined,
        state: undefined,
        street: undefined
    });
    const onBlur = useCallback((ev: React.FocusEvent<DataEntryElements>) => {
        setNameParts((prev) => ({ ...prev, [ev.target.name]: ev.target.name === 'selfStorage' ? (ev.target.labels ? ev.target.labels[0].innerText : '') : ev.target.value }));
    }, []);
    const setName = useMemo(() => {
        return [nameParts.selfStorage, [nameParts.city, nameParts.state].join(',  '), nameParts.street?.split(' ').slice(1).join(' ')].filter((x) => x != null).join(' - ');
    }, [nameParts.city, nameParts.selfStorage, nameParts.state, nameParts.street]);
    return (
        <InsertForm collName='facility' initial={facilityInitial} mutation={facilityInsert} cols={4} data-name={setName} createVariables={createVariables}>
            <Control
                Component={Lookup}
                label='Self Storage'
                name='selfStorage'
                required
                dataObjectPropName='selfStorages'
                propName='name'
                query={selfStorageDropDownOptions}
                size={1}
                onBlur={onBlur}
            />
            <Control Component={Input} label='Name' name='name' readOnly required type='text' />
            <Control Component={Input} label='Phone Number' name='phoneNumber' type='tel' />
            <Control Component={Input} label='E-mail' name='email' type='email' />
            <Fieldset legend='Address'>
                <Control Component={Input} label='Street' name='address.street' type='text' onBlur={onBlur} />
                <Control Component={Input} label='Suite' name='address.suite' type='text' />
                <Control Component={Input} label='City' name='address.city' type='text' onBlur={onBlur} />
                <Control Component={Select} label='State' name='address.state' options={provinceMap} size={1}/>
                <Control Component={Select} label='Country' name='address.country' options={countryMap} size={1} />                 
                <Control
                    Component={Input}
                    label='Postal Code'
                    name='address.postal'
                    type='text'
                    placeholder='ex: 90210 or A1B 0C1'
                    pattern='^[0-9]{5}([-]?[0-9]{4})?$|^[ABCEGHJKLMNPRSTVXYabceghjklmnprstvxy][0-9][ABCEGHJKLMNPRSTVXYabceghjklmnprstvxy][- ][0-9][ABCEGHJKLMNPRSTVXYabceghjklmnprstvxy][0-9]$'
                />
            </Fieldset>
        </InsertForm>
    );
}
