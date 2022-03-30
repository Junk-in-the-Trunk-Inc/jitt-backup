export function distinct<T>(arr: T[], accum = [] as T[]): T[] {
    // console.log('arr', arr, 'accum', accum);
    if (arr.length === 0) return accum;
    const [head, ...tail] = arr;
    const result = distinct(tail, accum.includes(head) ? accum : [...accum, head]);
    return result;
}
