import type { Method } from "./types";
export declare const stateContext: WeakMap<HTMLElement, any>;
export declare const defaultStateContext: WeakMap<HTMLElement, any>;
export declare const listenerContext: WeakMap<HTMLElement, any>;
export declare class Grain {
    name: string;
    base: HTMLElement;
    onClick(event: Event): void;
    onChange(event: Event): void;
    onInput(event: Event): void;
    onMouseOver(event: Event): void;
    onMouseOut(event: Event): void;
    onKeyDown(event: Event): void;
    onKeyUp(event: Event): void;
    constructor(name: string, base?: HTMLElement);
    mount(): void;
    innerText(value: string): void;
    innerHTML(value: string): void;
    outerHTML(value: string): void;
    static within(element: HTMLElement, name: string): Grain;
    within(element: HTMLElement): Grain;
    static last(name: string): Grain;
    last(): Grain;
    static first(name: string): Grain;
    first(): Grain;
    static all(name: string): Grain[];
    all(): Grain[];
    static append(grain: Grain, otherGrain: Grain): void;
    append(otherGrain: Grain): void;
    static prepend(grain: Grain, otherGrain: Grain): void;
    prepend(otherGrain: Grain): void;
}
export declare class ReactiveGrain<TState extends Record<string, any> = Record<string, any>> extends Grain {
    constructor(name: string, defaultState?: TState, base?: HTMLElement);
    seedState(): void;
    mount(): void;
    get state(): TState;
    get defaultState(): TState;
    set state(newState: TState);
    private fetcher;
    delete(url: string, logic?: (data: Response) => void | Promise<void>): Promise<void>;
    put(url: string, logic?: (data: Response) => void | Promise<void>): Promise<void>;
    post(url: string, logic?: (data: Response) => void | Promise<void>): Promise<void>;
    get(url: string, logic?: (data: Response) => void | Promise<void>): Promise<void>;
    hypermedia(url: string, method: Method, logic?: (text: string) => void | Promise<void>): Promise<void>;
}
export declare function listeners(grain: Grain): void;
