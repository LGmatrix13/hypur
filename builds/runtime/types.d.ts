import type { HypurElement } from "./element";
export type Action<TEvent extends Event, TState extends Record<string, any>> = (element: HypurElement<TState>, event: TEvent, state: TState) => void;
