import { distinct } from '../common/array/distinct';

export function cn(rcrd: Record<string, boolean>, classes: string) {
    console.log('rcrd', rcrd, 'classes', classes);
    const cls = distinct(classes.split(' '));
    console.log(cls);
    const [truthy, falsey] = [[...cls], []] as [string[], string[]];
    Object.entries(rcrd).forEach(([$cl, $flag]) => {
        if ($flag) {
            console.log(`flag is true`, $cl, $flag);
            truthy.push($cl);
        } else {
            console.log(`flag is false`, $cl, $flag);
            falsey.push($cl);
        }
    });
    console.log('truthy', truthy, 'falsey', falsey);
    const r1 = distinct(truthy, []);
    const result = r1
        .filter((x) => !falsey.includes(x))
        .join(' ');
    console.log(`result`, result);
    return result;
}
