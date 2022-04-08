import { gql } from '@apollo/client';
import { ObjectId } from 'bson';
import { stringify } from 'querystring';
import { cn } from '../../../util/cn';
import { BaseRow } from '../../data/BaseRow';
import { Grid } from '../../data/Grid';

const selfStorageQuery = gql`
    query {
        selfStorages(sortBy: NAME_ASC) {
            _id
            name
            website
        }
    }
`;

export function SelfStorageGrid() {
    function Headers() {
        return (
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Website</th>
            </tr>
        );
    }
    const Row = BaseRow({
        additional: (p: { x: any }) => {
            const { x } = p;
            return (
                <>
                    <td>{x.name}</td>
                    <td>{x.website}</td>
                </>
            );
        }
    });

    return <Grid Headers={Headers} Row={Row} propName='selfStorages' query={selfStorageQuery} />;
}



export const updateOneFacilityMutation = gql`
    mutation UpdateFacilityName($name: String!, $id: ObjectId!) {
        updateOneFacility(set: { name: $name }, query: { _id: $id }) {
            _id
        }
    }
`;
