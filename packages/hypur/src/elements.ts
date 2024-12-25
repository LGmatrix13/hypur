import { HypurElement } from "./element";
import type { Action } from "./types";

export function elements<TState extends Record<string, any>>(
  name: string,
  state?: TState
): HypurElements<TState> {
  const baseElements = document.querySelectorAll(`[kent="${name}"]`);

  if (!baseElements.length) {
    throw new Error(`Elements ${name} do not exist`);
  }

  const elements = Array.from(baseElements).map(
    (element) => new HypurElement<TState>(name, element as HTMLElement, state)
  );

  return new HypurElements<TState>(elements);
}

export class HypurElements<TState extends Record<string, any>> extends Array<
  HypurElement<TState>
> {
  constructor(elements: HypurElement<TState>[]) {
    super();
    this.push(...elements);
  }

  /**
   * Binds a handler for a specific event type.
   */
  onEvent(eventType: string, action: Action<TState>) {
    this.forEach((element) => {
      element.baseElement.addEventListener(eventType, (event) => {
        action(element, event);
      });
    });
  }

  bind() {
    this.forEach((element) => {
      element.bind();
    });
    return this;
  }

  /**
   * Helper methods for common events.
   */
  onClick(action: (element: HypurElement<TState>, event?: MouseEvent) => void) {
    this.onEvent("click", action as Action<TState>);
  }

  onChange(action: (element: HypurElement<TState>, event?: Event) => void) {
    this.onEvent("change", action as Action<TState>);
  }

  onInput(action: (element: HypurElement<TState>, event?: InputEvent) => void) {
    this.onEvent("input", action as Action<TState>);
  }

  onMouseOver(
    action: (element: HypurElement<TState>, event?: MouseEvent) => void
  ) {
    this.onEvent("mouseover", action as Action<TState>);
  }

  onMouseOut(
    action: (element: HypurElement<TState>, event?: MouseEvent) => void
  ) {
    this.onEvent("mouseout", action as Action<TState>);
  }

  onKeyDown(
    action: (element: HypurElement<TState>, event?: KeyboardEvent) => void
  ) {
    this.onEvent("keydown", action as Action<TState>);
  }

  onKeyUp(
    action: (element: HypurElement<TState>, event?: KeyboardEvent) => void
  ) {
    this.onEvent("keyup", action as Action<TState>);
  }

  append(...values: any) {
    const last = this[this.length - 1];
    const clone = new HypurElement(last.name, last.baseElement, last.state);
    clone.spread(...values);
    this.append(clone);
  }
}
