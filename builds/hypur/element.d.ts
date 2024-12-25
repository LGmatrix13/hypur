import type { Action } from "./types";
export declare function p<TState extends Record<string, any>>(name: string, state?: TState): HypurElement<TState>;
export declare function button<TState extends Record<string, any>>(name: string, state?: TState): HypurElement<TState>;
export declare function section<TState extends Record<string, any>>(name: string, state?: TState): HypurElement<TState>;
export declare function h1<TState extends Record<string, any>>(name: string, state?: TState): HypurElement<TState>;
export declare function h2<TState extends Record<string, any>>(name: string, state?: TState): HypurElement<TState>;
export declare function h3<TState extends Record<string, any>>(name: string, state?: TState): HypurElement<TState>;
export declare function div<TState extends Record<string, any>>(name: string, state?: TState): HypurElement<TState>;
export declare function element<TState extends Record<string, any>>(name: string, state?: TState): HypurElement<TState>;
export declare class HypurElement<TState extends Record<string, any>> {
    name: string;
    baseElement: HTMLElement;
    bindState: boolean;
    key?: number;
    constructor(name: string, baseElement: HTMLElement, state?: TState);
    get element(): HTMLElement;
    get state(): TState;
    setState(callback: (prev: TState) => TState): void;
    private set state(value);
    setChildren(children: HypurElement<any>): void;
    onEvent(eventType: string, action: Action<TState, Event>): void;
    bind(): this;
    onClick(action: Action<TState, MouseEvent>): void;
    onChange(action: Action<TState, Event>): void;
    onInput(action: Action<TState, InputEvent>): void;
    onMouseOver(action: Action<TState, MouseEvent>): void;
    onMouseOut(action: Action<TState, MouseEvent>): void;
    onKeyDown(action: Action<TState, KeyboardEvent>): void;
    onKeyUp(action: Action<TState, KeyboardEvent>): void;
    get parent(): HTMLElement;
    duplicate(): void;
    remove(): void;
    delete(url: URL, logic?: (data: Response) => void | Promise<void>): Promise<void>;
    put(url: URL, logic?: (data: Response) => void | Promise<void>): Promise<void>;
    post(url: URL, logic?: (data: Response) => void | Promise<void>): Promise<void>;
    get(url: URL, logic?: (data: Response) => void | Promise<void>): Promise<void>;
}
