/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { gql } from '@apollo/client';
import { kebabToTitleCase } from '../../kebabToTitleCase';
import { ObjectId } from 'bson';
import { SelfStorageDTO } from "./SelfStorageDTO";

export const selfStorageInsertMutation = gql`
    mutation InsertSelfStorage($name: String!, $website: String) {
        insertOneSelfStorage(data: { name: $name, website: $website }) {
            _id
            name
            website
        }
    }
`;

export const initialSelfStorage = (): SelfStorageDTO => ({ _id: new ObjectId().toHexString(), name: '', website: '' });

export const extract = (collName: string) => (x: string) => ({ body: 'You have successfully inserted a new record. ID ' + x, subtitle: kebabToTitleCase(collName), title: 'SUCCESS' });

// console.log(setProperty('name', {})('Bobby'));
// console.log(setProperty('name.first', {})('Bobby'));
// console.log(setProperty('name.first', { name: { first: 'Brian', last: 'Kalaf' }})('Bobby'));
// console.log(setProperty('name.first', { name: { first: 'Brian', last: 'Kalaf' }})(undefined));
// console.log(setProperty('name.middle', { age:13, name: { first: 'Brian', last: 'Kalaf' }})('E'));
// console.log(setProperty('address.state', { age:13, name: { first: 'Brian', last: 'Kalaf' }, address: { city: 'Los Angeles', state: 'CA' }})('GA'));
// console.log(getProperty('address.state')({ age:13, name: { first: 'Brian', last: 'Kalaf' }, address: { city: 'Los Angeles', state: 'CA' }}));
// console.log(getProperty('name.last')({ age:13, name: { first: 'Brian', last: 'Kalaf' }, address: { city: 'Los Angeles', state: 'CA' }}));
// console.log(getProperty('address.zip')({ age:13, name: { first: 'Brian', last: 'Kalaf' }, address: { city: 'Los Angeles', state: 'CA' }}));

export type BaseControlElement<TElement extends HTMLElement, TAttributes extends React.HTMLAttributes<TElement>> = React.FunctionComponent<Partial<TAttributes>>;


export const selfStorageDropDownOptions = gql`
    query {
        selfStorages {
            _id
            name
        }
    }
`;

