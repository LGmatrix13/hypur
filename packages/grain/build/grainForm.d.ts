export declare class FormGrain<FData extends Record<string, any> = Record<string, any>> {
    private static fetcher;
    beforeSubmit(data: FData): FData | Promise<FData>;
    onSubmit(data: FData): void | Promise<void>;
    afterSubmit(response: Response): void | Promise<void>;
    static mount<T extends typeof FormGrain>(id: string, constructor: T): void;
}
