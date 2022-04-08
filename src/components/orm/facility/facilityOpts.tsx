import { gql } from '@apollo/client';
import { FacilityDTO } from "./FacilityDTO";
import { ObjectId } from 'bson';

export const facilityInitial = (): FacilityDTO => ({
    _id: new ObjectId().toHexString(),
    name: '',
    selfStorage: {
        _id: '',
        name: ''
    },
    address: { city: '', state: 'CA', country: 'US' }
});

export const facilityInsert = gql`
    mutation InsertOneFacility(
        $selfStorage: ObjectId!
        $street: String
        $suite: String
        $city: String
        $state: String!
        $postal: String
        $country: String!
        $phoneNumber: String
        $email: String
        $facilityNumber: String
        $name: String!
    ) {
        insertOneFacility(
            data: {
                name: $name
                selfStorage: { link: $selfStorage }
                address: { street: $street, suite: $suite, city: $city, state: $state, country: $country, postal: $postal }
                phoneNumber: $phoneNumber
                email: $email
                facilityNumber: $facilityNumber
            }
        ) {
            _id
        }
    }
`;