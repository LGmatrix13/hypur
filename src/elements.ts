import { KentElement } from "./element";
import type { Action } from "./types";

export function elements<TState extends Record<string, any>>(args: {
  className: string;
}): KentElements<TState> {
  const { className } = args;
  const baseElements = document.getElementsByClassName(className);

  if (!baseElements.length) {
    throw new Error(`Elements with class ${className} does not exist`);
  }

  const elements = Array.from(baseElements).map(
    (element) => new KentElement<TState>(element as HTMLElement)
  );

  return new KentElements<TState>(elements);
}

export class KentElements<TState extends Record<string, any>> extends Array<
  KentElement<TState>
> {
  constructor(elements: KentElement<TState>[]) {
    super();
    this.push(...elements);
  }

  /**
   * Binds a handler for a specific event type.
   */
  onEvent(eventType: string, action: Action<TState>) {
    this.forEach((element) => {
      element.addEventListener(eventType, (event) => {
        action(element, event);
      });
    });
  }

  /**
   * Helper methods for common events.
   */
  onClick(action: (element: KentElement<TState>, event?: MouseEvent) => void) {
    this.onEvent("click", action as Action<TState>);
  }

  onChange(action: (element: KentElement<TState>, event?: Event) => void) {
    this.onEvent("change", action as Action<TState>);
  }

  onInput(action: (element: KentElement<TState>, event?: InputEvent) => void) {
    this.onEvent("input", action as Action<TState>);
  }

  onMouseOver(
    action: (element: KentElement<TState>, event?: MouseEvent) => void
  ) {
    this.onEvent("mouseover", action as Action<TState>);
  }

  onMouseOut(
    action: (element: KentElement<TState>, event?: MouseEvent) => void
  ) {
    this.onEvent("mouseout", action as Action<TState>);
  }

  onKeyDown(
    action: (element: KentElement<TState>, event?: KeyboardEvent) => void
  ) {
    this.onEvent("keydown", action as Action<TState>);
  }

  onKeyUp(
    action: (element: KentElement<TState>, event?: KeyboardEvent) => void
  ) {
    this.onEvent("keyup", action as Action<TState>);
  }

  append(...values: any) {
    const last = this[this.length - 1];
    const clone = new KentElement(last, last.state);
    clone.spread(...values);
    this.append(clone);
  }
}
