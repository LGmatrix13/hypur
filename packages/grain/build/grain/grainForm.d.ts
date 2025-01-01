export declare class GrainForm<FData extends Record<string, any> = Record<string, any>> extends HTMLFormElement {
    constructor();
    private fetcher;
    handlePrepareData(data: FData): FData | Promise<FData>;
    handleData(data: FData): void | Promise<void>;
    handleResponse(response: Response): void | Promise<void>;
    static mount(name: string, constructor: CustomElementConstructor): void;
}
