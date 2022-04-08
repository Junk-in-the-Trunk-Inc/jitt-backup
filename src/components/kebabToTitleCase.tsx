import { replaceAll } from '../common/text/replaceAll';
import { capitalize } from '../common/text/capitalize';

export function kebabToTitleCase(s: string) {
    return replaceAll(
        '-',
        ' '
    )(s)
        .split(' ')
        .map((x) => capitalize(x.toLowerCase()))
        .join(' ');
}
