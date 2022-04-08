import { distinct } from '../common/array/distinct';

export function cn(rcrd: Record<string, boolean>, classes: string) {
    const cls = distinct(classes.split(' '));
    const [truthy, falsey] = [[...cls], []] as [string[], string[]];
    Object.entries(rcrd).forEach(([$cl, $flag]) => {
        if ($flag) {
            truthy.push($cl);
        } else {
            falsey.push($cl);
        }
    });
    const r1 = distinct(truthy, []);
    const result = r1
        .filter((x) => !falsey.includes(x))
        .join(' ');
    return result;
}
