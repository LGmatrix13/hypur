import { loading } from "./loading";
import type { Action, Listeners } from "./types";

export const stateStore = new WeakMap();

export class Grain<TState extends Record<string, any> = Record<string, any>> {
  name: string;
  base: HTMLElement;
  listeners: Listeners<TState>;
  defaultState?: TState;

  constructor(name: string, state?: TState, base?: HTMLElement) {
    this.name = name;
    const baseElement =
      base || (document.querySelector(`[grain="${name}"]`) as HTMLElement);

    if (!baseElement) {
      throw new Error(`HTMLElement ${name} does not exist`);
    }

    this.base = baseElement;
    this.listeners = [];
    this.defaultState = state;
    stateStore.set(baseElement, state || {});

    document.addEventListener("DOMContentLoaded", async () => {
      await Promise.resolve(this.handle());
    });
  }

  get state() {
    return stateStore.get(this.base);
  }

  setState(callback: (prev: TState) => TState) {
    this.state = { ...this.state, ...callback(this.state) };
  }

  resetState() {
    this.state = (this.defaultState || {}) as TState;
  }

  private set state(newState: TState) {
    stateStore.set(this.base, newState);
  }

  innerText(value: string) {
    this.base.innerText = value;
  }

  innerHTML(value: string) {
    this.base.innerHTML = value;
  }

  outerHTML(value: string) {
    this.base.outerHTML = value;
  }

  onEvent(eventType: string, action: Action<Event, TState>) {
    this.listeners.push({ eventType, action });
    this.base.addEventListener(eventType, (event) => {
      const state = stateStore.get(this.base);
      action(event, state);
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

  private async fetcher(url: string, method: string) {
    loading.start();
    const fullUrl = new URL(window.origin, url);
    const data = await fetch(fullUrl, {
      method: method,
      body: stateStore.get(this.base),
    });
    loading.end();
    return data;
  }

  async delete(url: string, logic?: (data: Response) => void | Promise<void>) {
    const data = await this.fetcher(url, "DELETE");
    if (logic) {
      await Promise.resolve(logic(data));
    }
  }

  async put(url: string, logic?: (data: Response) => void | Promise<void>) {
    const data = await this.fetcher(url, "PUT");
    if (logic) {
      await Promise.resolve(logic(data));
    }
  }

  async post(url: string, logic?: (data: Response) => void | Promise<void>) {
    const data = await this.fetcher(url, "POST");
    if (logic) {
      await Promise.resolve(logic(data));
    }
  }

  async get(url: string, logic?: (data: Response) => void | Promise<void>) {
    const data = await this.fetcher(url, "GET");
    if (logic) {
      await Promise.resolve(logic(data));
    }
  }

  async hypermedia(
    url: string,
    method: "GET" | "POST" | "DELETE" | "PUT" | "PATCH",
    logic?: (text: string) => void | Promise<void>
  ) {
    const data = await this.fetcher(url, method);
    const text = await data.text();
    if (logic) {
      await Promise.resolve(logic(text));
    }
  }

  handle(): Promise<void> | void {}
}
