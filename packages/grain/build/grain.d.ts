export declare class Grain extends HTMLElement {
    onClick(event: Event): void | Promise<void>;
    onChange(event: Event): void | Promise<void>;
    onInput(event: Event): void | Promise<void>;
    onMouseOver(event: Event): void | Promise<void>;
    onMouseOut(event: Event): void | Promise<void>;
    onKeyDown(event: Event): void | Promise<void>;
    onKeyUp(event: Event): void | Promise<void>;
    constructor();
    private resolver;
    private connectedCallback;
    private disconnectedCallback;
    static mount(name: string, constructor: CustomElementConstructor): void;
}
