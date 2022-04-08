import { replaceAll } from './replaceAll';
import { capitalize } from './capitalize';


export function kebabToTitleCase(s: string) {
    return replaceAll(
        '-',
        ' '
    )(s)
        .split(' ')
        .map((x) => capitalize(x.toLowerCase()))
        .join(' ');
}
