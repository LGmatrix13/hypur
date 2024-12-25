import { loading } from "./loading";
import type { Action } from "./types";

const stateStore = new WeakMap();

export function p<TState extends Record<string, any>>(
  name: string,
  state?: TState
): HypurElement<TState> {
  return elementByTag(name, state, "p");
}

export function button<TState extends Record<string, any>>(
  name: string,
  state?: TState
): HypurElement<TState> {
  return elementByTag(name, state, "button");
}

export function section<TState extends Record<string, any>>(
  name: string,
  state?: TState
): HypurElement<TState> {
  return elementByTag(name, state, "section");
}

export function h1<TState extends Record<string, any>>(
  name: string,
  state?: TState
): HypurElement<TState> {
  return elementByTag(name, state, "h1");
}

export function h2<TState extends Record<string, any>>(
  name: string,
  state?: TState
): HypurElement<TState> {
  return elementByTag(name, state, "h2");
}

export function h3<TState extends Record<string, any>>(
  name: string,
  state?: TState
): HypurElement<TState> {
  return elementByTag(name, state, "h2");
}

export function div<TState extends Record<string, any>>(
  name: string,
  state?: TState
): HypurElement<TState> {
  return elementByTag(name, state, "div");
}

function elementByTag<TState extends Record<string, any>>(
  name: string,
  state?: TState,
  tagName?: string
): HypurElement<TState> {
  const baseElement = document.querySelector(
    `${tagName}[hypur="${name}"]`
  ) as HTMLElement;

  if (!baseElement) {
    throw new Error(`${tagName} HTMLElement element ${name} does not exist`);
  }

  return new HypurElement<TState>(name, baseElement, state);
}

export function element<TState extends Record<string, any>>(
  name: string,
  state?: TState
): HypurElement<TState> {
  const baseElement = document.querySelector(
    `[hypur="${name}"]`
  ) as HTMLElement;

  if (!baseElement) {
    throw new Error(`HTMLElement ${name} does not exist`);
  }

  return new HypurElement<TState>(name, baseElement, state);
}

async function fetcher(url: URL, method: string, baseElement: HTMLElement) {
  loading.start();
  const data = await fetch(url, {
    method: method,
    body: stateStore.get(baseElement),
  });
  loading.end();
  return data;
}

export class HypurElement<TState extends Record<string, any>> {
  name: string;
  baseElement: HTMLElement;
  bindState: boolean = false;
  key?: number;

  constructor(name: string, baseElement: HTMLElement, state?: TState) {
    this.name = name;
    this.baseElement = baseElement;
    const key = this.baseElement.dataset.key;
    if (key) this.key = Number(key);
    stateStore.set(this.baseElement, state);
  }

  get element() {
    return this.baseElement;
  }

  get state() {
    return stateStore.get(this.baseElement);
  }

  setState(callback: (prev: TState) => TState) {
    this.state = { ...this.state, ...callback(this.state) };
  }

  private set state(newState: TState) {
    stateStore.set(this.baseElement, newState);
    if (this.bindState) {
      Object.keys(newState).forEach((key) => {
        const child = this.baseElement.querySelector(
          `[hypur="${key}"]`
        ) as HTMLElement;
        if (child !== null) {
          child.innerText = newState[key] && newState[key];
        }
      });
    }
  }

  setChildren(children: HypurElement<any>) {
    this.baseElement.innerHTML = children.baseElement.innerHTML;
  }

  onEvent(eventType: string, action: Action<TState, Event>) {
    this.baseElement.addEventListener(eventType, (event) => {
      action(this, event);
    });
  }

  bind() {
    this.bindState = true;
    return this;
  }

  onClick(action: Action<TState, MouseEvent>) {
    this.onEvent("click", action as Action<TState, Event>);
  }

  onChange(action: Action<TState, Event>) {
    this.onEvent("change", action);
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

  get parent() {
    const parent = this.baseElement.parentElement;
    if (!parent) {
      throw new Error(`HypurElement ${this.name} does not have parent`);
    }
    return parent;
  }

  duplicate() {
    const clone = this.baseElement.cloneNode(true);
    const parent = this.baseElement.parentNode;
    if (!parent) {
      throw new Error(
        `HypurElement with id ${this.baseElement.id} does not have parent to run duplicate`
      );
    }
    this.baseElement.parentNode?.appendChild(clone);
  }

  remove() {
    this.baseElement.remove();
  }

  async delete(url: URL, logic?: (data: Response) => void | Promise<void>) {
    const data = await fetcher(url, "DELETE", this.baseElement);
    if (logic) {
      await Promise.resolve(logic(data));
    }
  }

  async put(url: URL, logic?: (data: Response) => void | Promise<void>) {
    const data = await fetcher(url, "PUT", this.baseElement);
    if (logic) {
      await Promise.resolve(logic(data));
    }
  }

  async post(url: URL, logic?: (data: Response) => void | Promise<void>) {
    const data = await fetcher(url, "POST", this.baseElement);
    if (logic) {
      await Promise.resolve(logic(data));
    }
  }

  async get(url: URL, logic?: (data: Response) => void | Promise<void>) {
    const data = await fetcher(url, "GET", this.baseElement);
    if (logic) {
      await Promise.resolve(logic(data));
    }
  }
}
