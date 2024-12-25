import { HypurElement } from "./element";
import type { Action } from "./types";
export declare function elements<TState extends Record<string, any>>(name: string, state?: TState): HypurElements<TState>;
export declare class HypurElements<TState extends Record<string, any>> extends Array<HypurElement<TState>> {
    constructor(elements: HypurElement<TState>[]);
    /**
     * Binds a handler for a specific event type.
     */
    onEvent(eventType: string, action: Action<TState, Event>): void;
    bind(): this;
    /**
     * Helper methods for common events.
     */
    onClick(action: Action<TState, Event>): void;
    onChange(action: Action<TState, InputEvent>): void;
    onInput(action: Action<TState, InputEvent>): void;
    onMouseOver(action: Action<TState, MouseEvent>): void;
    onMouseOut(action: Action<TState, MouseEvent>): void;
    onKeyDown(action: Action<TState, KeyboardEvent>): void;
    onKeyUp(action: Action<TState, KeyboardEvent>): void;
    append(state: Record<string, any>): void;
}
