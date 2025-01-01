import type { Method } from "./types";
export declare class Grain extends HTMLElement {
    onClick(event: Event): void;
    onChange(event: Event): void;
    onInput(event: Event): void;
    onMouseOver(event: Event): void;
    onMouseOut(event: Event): void;
    onKeyDown(event: Event): void;
    onKeyUp(event: Event): void;
    constructor();
    static within(element: HTMLElement, name: string): HTMLElement;
    static last(name: string): HTMLElement;
    static first(name: string): HTMLElement;
    static all(name: string): HTMLElement[];
    static append(grain: Grain, otherGrain: Grain): void;
    static prepend(grain: Grain, otherGrain: Grain): void;
    static cloneNode(grain: Grain): HTMLElement;
    static spread(element: HTMLElement, content: Record<string, any>): void;
    static remove(element: HTMLElement): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    static mount(name: string, constructor: CustomElementConstructor): void;
    private static fetcher;
    static delete(url: string, data: Record<string, any>, logic?: (data: Response) => void | Promise<void>): Promise<void>;
    static put(url: string, data: Record<string, any>, logic?: (data: Response) => void | Promise<void>): Promise<void>;
    static post(url: string, data: Record<string, any>, logic?: (data: Response) => void | Promise<void>): Promise<void>;
    static get(url: string, data: Record<string, any>, logic?: (data: Response) => void | Promise<void>): Promise<void>;
    static hypermedia(url: string, method: Method, data: Record<string, any>, logic?: (text: string) => void | Promise<void>): Promise<void>;
}
