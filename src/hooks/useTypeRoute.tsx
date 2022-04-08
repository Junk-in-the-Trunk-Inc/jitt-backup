import { useParams } from 'react-router-dom';
import { replaceAll } from '../common/text/replaceAll';
import { capitalize } from '../common/text/capitalize';

export function useTypeRoute() {
    const { type } = useParams();
    const displayName = replaceAll(
        '-',
        ' '
    )(type ?? '')
        .split(' ')
        .map((x) => x.toLowerCase())
        .map(capitalize)
        .join(' ');

    return {
        type,
        displayName
    };
}
