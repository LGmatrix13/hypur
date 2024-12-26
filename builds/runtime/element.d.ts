import type { Action } from "./types";
export declare const stateStore: WeakMap<WeakKey, any>;
export declare function p<TState extends Record<string, any>>(name: string, state?: TState): HypurElement<TState>;
export declare function button<TState extends Record<string, any>>(name: string, state?: TState): HypurElement<TState>;
export declare function section<TState extends Record<string, any>>(name: string, state?: TState): HypurElement<TState>;
export declare function h1<TState extends Record<string, any>>(name: string, state?: TState): HypurElement<TState>;
export declare function h2<TState extends Record<string, any>>(name: string, state?: TState): HypurElement<TState>;
export declare function h3<TState extends Record<string, any>>(name: string, state?: TState): HypurElement<TState>;
export declare function div<TState extends Record<string, any>>(name: string, state?: TState): HypurElement<TState>;
export declare function input<TState extends Record<string, any>>(name: string, state?: TState): HypurElement<TState>;
export declare function select<TState extends Record<string, any>>(name: string, state?: TState): HypurElement<TState>;
export declare function element<TState extends Record<string, any>>(name: string, state?: TState): HypurElement<TState>;
export declare class HypurElement<TState extends Record<string, any>> {
    name: string;
    element: HTMLElement;
    listeners: {
        eventType: string;
        action: Action<Event, TState>;
    }[];
    defaultState?: TState;
    constructor(name: string, baseElement: HTMLElement, state?: TState);
    get state(): TState;
    setState(callback: (prev: TState) => TState): void;
    resetState(): void;
    private set state(value);
    onEvent(eventType: string, action: Action<Event, TState>): this;
    onClick(action: Action<MouseEvent, TState>): this;
    onChange(action: Action<Event, TState>): this;
    onInput(action: Action<InputEvent, TState>): this;
    onMouseOver(action: Action<MouseEvent, TState>): this;
    onMouseOut(action: Action<MouseEvent, TState>): this;
    onKeyDown(action: Action<KeyboardEvent, TState>): this;
    onKeyUp(action: Action<KeyboardEvent, TState>): this;
    private fetcher;
    delete(url: URL, logic?: (data: Response) => void | Promise<void>): Promise<void>;
    put(url: URL, logic?: (data: Response) => void | Promise<void>): Promise<void>;
    post(url: URL, logic?: (data: Response) => void | Promise<void>): Promise<void>;
    get(url: URL, logic?: (data: Response) => void | Promise<void>): Promise<void>;
}
