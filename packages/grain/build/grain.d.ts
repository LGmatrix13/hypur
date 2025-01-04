export declare class Grain extends HTMLElement {
    onClick(event: Event): void;
    onChange(event: Event): void;
    onInput(event: Event): void;
    onMouseOver(event: Event): void;
    onMouseOut(event: Event): void;
    onKeyDown(event: Event): void;
    onKeyUp(event: Event): void;
    constructor();
    data<T = string>(key: string, converter?: (value: string) => T): T;
    private connectedCallback;
    private disconnectedCallback;
    static mount(name: string, constructor: CustomElementConstructor): void;
}
