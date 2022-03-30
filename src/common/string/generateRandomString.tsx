import { toRange } from '../array/toRange';

export function generateRandomString(len: number) {
    function inner<T>(func: () => T, qty = 0): T[] {
        if (qty === 0) return [];
        return [func(), ...inner(func, qty - 1)];
    }
    const chars = [...toRange('0'.charCodeAt(0), '9'.charCodeAt(0)), ...toRange('a'.charCodeAt(0), 'z'.charCodeAt(0)), ...toRange('A'.charCodeAt(0), 'Z'.charCodeAt(0))];
    const charLength = chars.length;
    return inner(() => Math.random(), len)
        .map((x) => Math.floor(x * charLength))
        .map((ix) => String.fromCharCode(chars[ix]))
        .join('');
}
