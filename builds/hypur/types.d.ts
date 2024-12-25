import type { HypurElement } from "./element";
export type Action<TState extends Record<string, any>, TEvent extends Event> = (element: HypurElement<TState>, event?: TEvent) => void;
