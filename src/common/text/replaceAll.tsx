export function replaceAll(replaced: string, replacement: string) {
    return (source: string): string => (source.includes(replaced) ? replaceAll(replaced, replacement)(source.replace(replaced, replacement)) : source);
}
