import { HypurElement } from "./element";
import type { Action } from "./types";

export function elements<TState extends Record<string, any>>(
  name: string,
  state?: TState
): HypurElements<TState> {
  const baseElements = document.querySelectorAll(`[hypur="${name}"]`);

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
  onEvent(eventType: string, action: Action<TState, Event>) {
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
  onClick(action: Action<TState, Event>) {
    this.onEvent("click", action);
  }

  onChange(action: Action<TState, InputEvent>) {
    this.onEvent("change", action as Action<TState, Event>);
  }

  onInput(action: Action<TState, InputEvent>) {
    this.onEvent("input", action as Action<TState, Event>);
  }

  onMouseOver(action: Action<TState, MouseEvent>) {
    this.onEvent("mouseover", action as Action<TState, Event>);
  }

  onMouseOut(action: Action<TState, MouseEvent>) {
    this.onEvent("mouseout", action as Action<TState, Event>);
  }

  onKeyDown(action: Action<TState, KeyboardEvent>) {
    this.onEvent("keydown", action as Action<TState, Event>);
  }

  onKeyUp(action: Action<TState, KeyboardEvent>) {
    this.onEvent("keyup", action as Action<TState, Event>);
  }

  append(state: Record<string, any>) {
    const last = this[this.length - 1];
    const clone = new HypurElement<TState>(
      last.name,
      last.baseElement,
      state as TState
    ).bind();
    clone.setState(() => state as TState);
    this.append(clone);
  }
}
