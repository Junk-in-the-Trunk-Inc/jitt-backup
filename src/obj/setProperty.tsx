export function setProperty(name: string, obj: Record<string, any>) {
    return function (value: any): any {
        if (name.includes('.')) {
            const [head, ...tail] = name.split('.');
            const { [head]: next, ...remain } = obj;
            const nextResult = setProperty(tail.join('.'), next)(value);
            return { [head]: nextResult, ...remain };
        }
        const output = value == null ? { ...obj } : { ...obj, [name]: value };
        if (value == null) delete output[name];
        return output;
    };
}
