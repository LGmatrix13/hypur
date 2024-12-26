import { loading } from "./loading";
import type { Action } from "./types";

export const stateStore = new WeakMap();

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

export function input<TState extends Record<string, any>>(
  name: string,
  state?: TState
): HypurElement<TState> {
  return elementByTag(name, state, "input");
}

export function select<TState extends Record<string, any>>(
  name: string,
  state?: TState
): HypurElement<TState> {
  return elementByTag(name, state, "select");
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

export class HypurElement<TState extends Record<string, any>> {
  name: string;
  element: HTMLElement;
  listeners: {
    eventType: string;
    action: Action<Event, TState>;
  }[];
  defaultState?: TState;

  constructor(name: string, baseElement: HTMLElement, state?: TState) {
    this.name = name;
    this.element = baseElement;
    this.listeners = [];
    this.defaultState = state;
    stateStore.set(baseElement, state || {});
  }

  get state() {
    return stateStore.get(this.element);
  }

  setState(callback: (prev: TState) => TState) {
    this.state = { ...this.state, ...callback(this.state) };
  }

  resetState() {
    this.state = (this.defaultState || {}) as TState;
  }

  private set state(newState: TState) {
    stateStore.set(this.element, newState);
  }

  onEvent(eventType: string, action: Action<Event, TState>) {
    this.listeners.push({ eventType, action });
    this.element.addEventListener(eventType, (event) => {
      const state = stateStore.get(this.element);
      action(this, event, state);
    });
    return this;
  }

  onClick(action: Action<MouseEvent, TState>) {
    return this.onEvent("click", action as Action<Event, TState>);
  }

  onChange(action: Action<Event, TState>) {
    return this.onEvent("change", action);
  }

  onInput(action: Action<InputEvent, TState>) {
    return this.onEvent("input", action as Action<Event, TState>);
  }

  onMouseOver(action: Action<MouseEvent, TState>) {
    return this.onEvent("mouseover", action as Action<Event, TState>);
  }

  onMouseOut(action: Action<MouseEvent, TState>) {
    return this.onEvent("mouseout", action as Action<Event, TState>);
  }

  onKeyDown(action: Action<KeyboardEvent, TState>) {
    return this.onEvent("keydown", action as Action<Event, TState>);
  }

  onKeyUp(action: Action<KeyboardEvent, TState>) {
    return this.onEvent("keyup", action as Action<Event, TState>);
  }

  private async fetcher(url: URL, method: string) {
    loading.start();
    const data = await fetch(url, {
      method: method,
      body: stateStore.get(this.element),
    });
    loading.end();
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
