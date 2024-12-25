import type { Action } from "./types";

export function p<TState extends Record<string, any>>(
  name: string,
  state?: TState
): KentElement<TState> {
  return element(name, state, "p");
}

export function button<TState extends Record<string, any>>(
  name: string,
  state?: TState
): KentElement<TState> {
  return element(name, state, "button");
}

export function section<TState extends Record<string, any>>(
  name: string,
  state?: TState
): KentElement<TState> {
  return element(name, state, "section");
}

export function h1<TState extends Record<string, any>>(
  name: string,
  state?: TState
): KentElement<TState> {
  return element(name, state, "h1");
}

export function h2<TState extends Record<string, any>>(
  name: string,
  state?: TState
): KentElement<TState> {
  return element(name, state, "h2");
}

export function h3<TState extends Record<string, any>>(
  name: string,
  state?: TState
): KentElement<TState> {
  return element(name, state, "h2");
}

export function div<TState extends Record<string, any>>(
  name: string,
  state?: TState
): KentElement<TState> {
  return element(name, state, "div");
}

export function element<TState extends Record<string, any>>(
  name: string,
  state?: TState,
  tagName?: string
): KentElement<TState> {
  const baseElement = document.querySelector(
    `${tagName}[kent="${name}"]`
  ) as HTMLElement;

  if (!baseElement) {
    throw new Error(`${tagName} element ${name} does not exist`);
  }

  return new KentElement<TState>(baseElement, state);
}

export class KentElement<TState extends Record<string, any>> {
  baseElement: HTMLElement;
  bindState: boolean = false;

  constructor(baseElement: HTMLElement, state?: TState) {
    this.baseElement = baseElement;
    baseElement.dataset["state"] = JSON.stringify(state);
  }

  get element() {
    return this.baseElement;
  }

  get state() {
    return JSON.parse(this.baseElement.dataset.state as string) as TState;
  }

  setState(callback: (prev: TState) => TState) {
    this.state = { ...this.state, ...callback(this.state) };
  }

  private set state(newState: TState) {
    this.baseElement.dataset.state = JSON.stringify(newState);
    if (this.bindState) {
      Object.keys(newState).forEach((key) => {
        const child = this.baseElement.querySelector(
          `[kent="${key}"]`
        ) as HTMLElement;
        child.innerText = newState[key] && newState[key];
      });
    }
  }

  setChildren(children: KentElement<any>) {
    this.baseElement.innerHTML = children.baseElement.innerHTML;
  }

  onEvent(eventType: string, action: Action<TState>) {
    this.baseElement.addEventListener(eventType, (event) => {
      action(this, event);
    });
  }

  bind() {
    this.bindState = true;
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
    this.baseElement.childNodes.forEach((child, index) => {
      child.textContent = values[index];
    });
  }

  duplicate() {
    const clone = this.baseElement.cloneNode(true);
    const parent = this.baseElement.parentNode;
    if (!parent) {
      throw new Error(
        `KentElement with id ${this.baseElement.id} does not have parent to run duplicate`
      );
    }
    this.baseElement.parentNode?.appendChild(clone);
  }

  remove() {
    this.baseElement.remove();
  }

  private async fetcher(url: URL, method: string) {
    const data = await fetch(url, {
      method: method,
      body: this.baseElement.dataset.state as string,
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
