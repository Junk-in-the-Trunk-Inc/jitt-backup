declare global {
    export type Children = React.ReactNode | React.ReactNode[] | null;
    export type StateSetter<T> = React.Dispatch<React.SetStateAction<T>>;
    export type ToastCreator = (body: string, subtitle?: string, title?: string) => void;
    export type ToastExtractor = undefined | ((result?: U | Error) => { body: string; title?: string; subtitle?: string }) | { body: string; title?: string; subtitle?: string }
    export type DataEntryElements = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
}

export const i = 1;