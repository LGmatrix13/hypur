import { loading } from "./loading";
import type { Listeners, Method } from "./types";

export const stateContext = new WeakMap<HTMLElement>();
export const defaultStateContext = new WeakMap<HTMLElement>();
export const listenerContext = new WeakMap<HTMLElement>();

export class Grain {
  name: string;
  base: HTMLElement;

  onClick(event: Event): void {}
  onChange(event: Event): void {}
  onInput(event: Event): void {}
  onMouseOver(event: Event): void {}
  onMouseOut(event: Event): void {}
  onKeyDown(event: Event): void {}
  onKeyUp(event: Event): void {}

  constructor(name: string, base?: HTMLElement) {
    this.name = name;
    this.base = base || Grain.last(name).base;
    listeners(this);
  }

  mount() {
    Grain.all(this.name).forEach((grain) => new Grain(this.name, grain.base));
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

  static within(element: HTMLElement, name: string) {
    const within = element.querySelector(`[grain="${name}"]`);
    if (!within) {
      throw new Error(
        `No Grain of name ${name} found within requested element`
      );
    }
    return new Grain(name, within as HTMLElement);
  }

  within(element: HTMLElement) {
    return Grain.within(element, this.name);
  }

  static last(name: string) {
    const all = Array.from(document.querySelectorAll(`[grain="${name}"]`));
    if (!all.length) {
      throw new Error(`No Grain of name ${name} could be found`);
    }
    const last = all[all.length - 1];
    return new Grain(name, last as HTMLElement);
  }

  last() {
    return Grain.last(this.name);
  }

  static first(name: string) {
    const first = document.querySelector(`[grain="${name}"]`);
    if (!first) {
      throw new Error(`No Grain of name ${name} could be found`);
    }
    return new Grain(name, first as HTMLElement);
  }

  first() {
    return Grain.first(this.name);
  }

  static all(name: string) {
    const all = Array.from(document.querySelectorAll(`[grain="${name}"]`));
    if (!all.length) {
      throw new Error(`No Grain of name ${name} could be found`);
    }
    return all.map((item) => new Grain(name, item as HTMLElement));
  }

  all() {
    return Grain.all(this.name);
  }

  static append(grain: Grain, otherGrain: Grain) {
    grain.base.append(otherGrain.base);
  }

  append(otherGrain: Grain) {
    Grain.append(this, otherGrain);
  }

  static prepend(grain: Grain, otherGrain: Grain) {
    grain.base.prepend(otherGrain.base);
  }

  prepend(otherGrain: Grain) {
    Grain.prepend(this, otherGrain);
  }
}

export class ReactiveGrain<
  TState extends Record<string, any> = Record<string, any>
> extends Grain {
  constructor(name: string, defaultState?: TState, base?: HTMLElement) {
    super(name, base);
    defaultStateContext.set(this.base, defaultState || {});
    stateContext.set(this.base, defaultState || {});
  }

  seedState() {
    const seedState = this.base.getAttribute("grain-state");
    if (!seedState) {
      throw new Error(
        `Grain ${this.name} could not seed state. Make sure The "grain-state" attribute is set.`
      );
    }
    const seedStateParsed = JSON.parse(seedState) as TState;
    stateContext.set(this.base, seedStateParsed);
  }

  override mount() {
    Grain.all(this.name).forEach(
      (grain) => new ReactiveGrain(this.name, this.defaultState, grain.base)
    );
  }

  get state() {
    return stateContext.get(this.base) as TState;
  }

  get defaultState() {
    return defaultStateContext.get(this.base) as TState;
  }

  set state(newState: TState) {
    stateContext.set(this.base, newState);
  }

  private async fetcher(url: string, method: Method) {
    loading.start();
    const fullUrl = new URL(window.origin, url);
    const data = await fetch(fullUrl, {
      method: method,
      body: stateContext.get(this.base),
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
    method: Method,
    logic?: (text: string) => void | Promise<void>
  ) {
    const data = await this.fetcher(url, method);
    const text = await data.text();
    if (logic) {
      await Promise.resolve(logic(text));
    }
  }
}

export function listeners(grain: Grain) {
  const listeners: Listeners = listenerContext.get(grain.base) || [];
  if (Grain.prototype.onClick !== grain.onClick) {
    grain.base.addEventListener("click", grain.onClick.bind(grain));
    listeners.push({
      eventType: "click",
      logic: grain.onClick.bind(grain),
    });
  }
  if (Grain.prototype.onChange !== grain.onChange) {
    grain.base.addEventListener("change", grain.onChange.bind(grain));
    listeners.push({
      eventType: "change",
      logic: grain.onChange.bind(grain),
    });
  }
  if (Grain.prototype.onInput !== grain.onInput) {
    grain.base.addEventListener("input", grain.onInput.bind(grain));
    listeners.push({
      eventType: "input",
      logic: grain.onInput.bind(grain),
    });
  }
  if (Grain.prototype.onMouseOver !== grain.onMouseOver) {
    grain.base.addEventListener("mouseover", grain.onMouseOver.bind(grain));
    listeners.push({
      eventType: "mouseover",
      logic: grain.onMouseOver.bind(grain),
    });
  }
  if (Grain.prototype.onMouseOut !== grain.onMouseOut) {
    grain.base.addEventListener("mouseout", grain.onMouseOut.bind(grain));
    listeners.push({
      eventType: "mouseout",
      logic: grain.onMouseOut.bind(grain),
    });
  }
  if (Grain.prototype.onKeyDown !== grain.onKeyDown) {
    grain.base.addEventListener("keydown", grain.onKeyDown.bind(grain));
    listeners.push({
      eventType: "keydown",
      logic: grain.onKeyDown.bind(grain),
    });
  }
  if (Grain.prototype.onKeyUp !== grain.onKeyUp) {
    grain.base.addEventListener("keyup", grain.onKeyUp.bind(grain));
    listeners.push({
      eventType: "keyup",
      logic: grain.onKeyUp.bind(grain),
    });
  }

  listenerContext.set(grain.base, listeners);
}
