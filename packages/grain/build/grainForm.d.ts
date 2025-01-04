export declare class FormGrain<FData extends Record<string, any> = Record<string, any>> extends HTMLElement {
    private form?;
    constructor();
    private connectedCallback;
    private fetcher;
    beforeSubmit(data: FData): FData | Promise<FData>;
    onSubmit(data: FData): void | Promise<void>;
    afterSubmit(response: Response): void | Promise<void>;
    static mount(name: string, constructor: CustomElementConstructor): void;
}
