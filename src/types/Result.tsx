export interface IPass<T> {
    type: 'pass';
    value: T;
}
export interface IFail {
    type: 'fail';
    value: string[];
}
export type Result<T> = IPass<T> | IFail;

export const Result = {
    isPass<T>(item: Result<T>): item is IPass<T> {
        return item.type === 'pass';
    },
    isFail<T>(item: Result<T>): item is IFail {
        return item.type === 'fail';
    },
    pass<T>(value: T): Result<T> {
        return { type: 'pass', value };
    },
    fail<T>(...value: string[]): Result<T> {
        return { type: 'fail', value };
    },
    combine<T>(r1: Result<T>, r2: Result<T>): Result<T> {
        if (Result.isPass(r1)) {
            return r2;
        }
        if (Result.isPass(r2)) {
            return r1;
        }
        return Result.fail(...r1.value, ...r2.value);
    }
};
