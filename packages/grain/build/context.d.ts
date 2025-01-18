declare global {
    interface Window {
        HYPUR_CONTEXT: Record<string, unknown>;
    }
}
export declare class Context<T extends unknown> {
    private readonly key;
    constructor(key: string, value: T);
    get(): T;
    set(value: T): void;
    clear(): void;
}
