export function capitalize(s: string) {
    if (s.length === 0) return '';
    const [head, ...tail] = s.split('');
    return `${head.toUpperCase()}${tail.join('')}`;
}
