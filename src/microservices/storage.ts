// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;

export function setToLS(key: string, value: anyType): void {
    window.localStorage.setItem(key, JSON.stringify(value));
}

export function getFromLS<T = unknown>(key: string): T {
    const value: string = window.localStorage.getItem(key) as string;

    if (value) {
        return JSON.parse(value) as T;
    }

    return {} as T;
}
