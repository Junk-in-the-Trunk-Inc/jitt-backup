import { gql } from '@apollo/client';
import { BaseRow } from '../../data/BaseRow';
import { Grid } from '../../data/Grid';

export const facilityQuery = gql`
    query {
        facilities(sortBy: NAME_ASC) {
            _id
            name
            email
            phoneNumber
            facilityNumber
            address {
                city
                country
                postal
                state
                street
                suite
            }
            selfStorage {
                name
            }
        }
    }
`;
export function FacilityGrid() {
    function Headers() {
        return (
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Self Storage</th>
                <th>Facility Number</th>
                <th>E-mail</th>
                <th>Phone Number</th>
                <th>Street</th>
                <th>Suite</th>
                <th>City</th>
                <th>State</th>
                <th>Country</th>
                <th>Postal Code</th>
            </tr>
        );
    }
    const Row = BaseRow({
        additional: (p: { x: any }) => {
            const { x } = p;
            return (
                <>
                    <td>{x.name}</td>
                    <td>{x.selfStorage.name}</td>
                    <td>{x.facilityNumber}</td>
                    <td>{x.email}</td>
                    <td>{x.phoneNumber}</td>
                    <td>{x.address.street}</td>
                    <td>{x.address.suite}</td>
                    <td>{x.address.city}</td>
                    <td>{x.address.state}</td>
                    <td>{x.address.country}</td>
                    <td>{x.address.postal}</td>
                </>
            );
        }
    });

    return <Grid Headers={Headers} Row={Row} propName='facilities' query={facilityQuery} />;
}
