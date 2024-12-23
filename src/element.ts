export function element<TState extends Record<string, any>>(
  id: string,
  state?: TState
): KentElement<TState> {
  const baseElement = document.getElementById(id);

  if (!baseElement) {
    throw new Error(`Element with id ${id} does not exist`);
  }

  return new KentElement<TState>(baseElement, state);
}

type Action<TState extends Record<string, any>> = (
  element: KentElement<TState>,
  event?: Event
) => void;

export class KentElement<
  TState extends Record<string, any>
> extends HTMLElement {
  content: any;
  state: TState;

  constructor(baseElement: HTMLElement, state?: TState) {
    super();
    Array.from(baseElement.attributes).forEach((attr) =>
      this.setAttribute(attr.name, attr.value)
    );
    this.innerHTML = baseElement.innerHTML;
    this.state = state || ({} as TState);
  }

  setContent<T>(value: T) {
    this.content = value;
    this.innerText = String(value);
  }

  setChildren(children: KentElement<any>) {
    this.innerHTML = children.innerHTML;
  }

  getContent<T>() {
    return this.content as T;
  }

  /**
   * Binds a handler for a specific event type.
   */
  onEvent(eventType: string, action: Action<TState>) {
    this.addEventListener(eventType, (event) => {
      action(this, event);
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

  spread(...values: any[]) {
    this.childNodes.forEach((child, index) => {
      child.textContent = values[index];
    });
  }
}
