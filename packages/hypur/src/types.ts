import type { KentElement } from "./element";

export type Action<TState extends Record<string, any>> = (
  element: KentElement<TState>,
  event?: Event
) => void;
