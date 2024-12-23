import type { Action } from "./types";

export function element<TState extends Record<string, any>>(args: {
  id: string;
  state?: TState;
}): KentElement<TState> {
  const { id, state } = args;
  const baseElement = document.getElementById(id);

  if (!baseElement) {
    throw new Error(`Element with id ${id} does not exist`);
  }

  return new KentElement<TState>(baseElement, state);
}

export class KentElement<
  TState extends Record<string, any>
> extends HTMLElement {
  state: TState;

  constructor(baseElement: HTMLElement, state?: TState) {
    super();
    Array.from(baseElement.attributes).forEach((attr) =>
      this.setAttribute(attr.name, attr.value)
    );
    this.innerHTML = baseElement.innerHTML;
    this.state = state || ({} as TState);
  }

  setChildren(children: KentElement<any>) {
    this.innerHTML = children.innerHTML;
  }

  onEvent(eventType: string, action: Action<TState>) {
    this.addEventListener(eventType, (event) => {
      action(this, event);
    });
  }

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

  duplicate() {
    const clone = this.cloneNode(true);
    const parent = this.parentNode;
    if (!parent) {
      throw new Error(
        `KentElement with id ${this.id} does not have parent to run duplicate`
      );
    }
    this.parentNode?.appendChild(clone);
  }

  private async fetcher(url: URL, method: string) {
    const data = await fetch(url, {
      method: method,
      body: JSON.stringify({
        state: this.state,
      }),
    });
    return data;
  }

  async delete(url: URL, logic?: (data: Response) => void | Promise<void>) {
    const data = await this.fetcher(url, "DELETE");
    if (logic) {
      await Promise.resolve(logic(data));
    }
  }

  async put(url: URL, logic?: (data: Response) => void | Promise<void>) {
    const data = await this.fetcher(url, "PUT");
    if (logic) {
      await Promise.resolve(logic(data));
    }
  }

  async post(url: URL, logic?: (data: Response) => void | Promise<void>) {
    const data = await this.fetcher(url, "POST");
    if (logic) {
      await Promise.resolve(logic(data));
    }
  }

  async get(url: URL, logic?: (data: Response) => void | Promise<void>) {
    const data = await this.fetcher(url, "GET");
    if (logic) {
      await Promise.resolve(logic(data));
    }
  }
}
