export declare class PersistantContext<T extends unknown> {
    private readonly key;
    constructor(key: string, value: T);
    get(): T;
    set(value: T): void;
    clear(): void;
}
