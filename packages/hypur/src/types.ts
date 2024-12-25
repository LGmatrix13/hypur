import type { HypurElement } from "./element";

export type Action<TState extends Record<string, any>> = (
  element: HypurElement<TState>,
  event?: Event
) => void;
