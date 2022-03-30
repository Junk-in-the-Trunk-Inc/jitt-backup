export function toRange(start: number, end: number): number[] {
    if (start > end) return [];
    return [start, ...toRange(start + 1, end)];
}
