export declare class Grain extends HTMLElement {
    onClick(event: Event): void;
    onChange(event: Event): void;
    onInput(event: Event): void;
    onMouseOver(event: Event): void;
    onMouseOut(event: Event): void;
    onKeyDown(event: Event): void;
    onKeyUp(event: Event): void;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    static mount(name: string, constructor: CustomElementConstructor, base?: string): void;
}
