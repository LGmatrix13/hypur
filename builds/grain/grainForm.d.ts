export declare class GrainForm<FData extends Record<string, any> = Record<string, any>> {
    base: HTMLFormElement;
    constructor(name: string);
    private fetcher;
    handleData(data: FData): void | Promise<void>;
    handleResponse(response: Response): void | Promise<void>;
}
