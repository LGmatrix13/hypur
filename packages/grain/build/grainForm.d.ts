export declare class FormGrain<FData extends Record<string, any> = Record<string, any>> extends HTMLElement {
    constructor();
    private fetcher;
    reset(): void;
    beforeSubmit(data: FData): FData | Promise<FData>;
    onSubmit(data: FData): void | Promise<void>;
    afterSubmit(response: Response): void | Promise<void>;
    static mount(tag: string, constructor: CustomElementConstructor): void;
}
