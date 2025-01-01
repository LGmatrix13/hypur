import { loading } from "./loading";
import type { Method } from "./types";

export class Grain extends HTMLElement {
  onClick(event: Event): void {}
  onChange(event: Event): void {}
  onInput(event: Event): void {}
  onMouseOver(event: Event): void {}
  onMouseOut(event: Event): void {}
  onKeyDown(event: Event): void {}
  onKeyUp(event: Event): void {}

  constructor() {
    super();
  }

  static within(element: HTMLElement, name: string) {
    const within = element.querySelector(`[is="${name}"]`);
    if (!within) {
      throw new Error(
        `No Grain of name ${name} found within requested element`
      );
    }
    return within as HTMLElement;
  }

  static last(name: string) {
    const all = Array.from(document.querySelectorAll(`[is="${name}"]`));
    if (!all.length) {
      throw new Error(`No Grain of name ${name} could be found`);
    }
    const last = all[all.length - 1];
    return last as HTMLElement;
  }

  static first(name: string) {
    const first = document.querySelector(`[is="${name}"]`);
    if (!first) {
      throw new Error(`No Grain of name ${name} could be found`);
    }
    return first as HTMLElement;
  }

  static all(name: string) {
    const all = Array.from(document.querySelectorAll(`[is="${name}"]`));
    if (!all.length) {
      throw new Error(`No Grain of name ${name} could be found`);
    }
    return all as HTMLElement[];
  }

  static append(grain: Grain, otherGrain: Grain) {
    grain.append(otherGrain);
  }

  static prepend(grain: Grain, otherGrain: Grain) {
    grain.prepend(otherGrain);
  }

  static cloneNode(grain: Grain) {
    return grain.cloneNode(true) as HTMLElement;
  }

  static spread(element: HTMLElement, content: Record<string, any>) {
    Object.keys(content).forEach((key) => {
      const child = element.querySelector(`[is="${key}"]`);
      if (!child) {
        const customElement = element.querySelector(key);
        if (!customElement) {
          throw new Error(`Grain of nam ${key} could not be found`);
        }
        (customElement as HTMLElement).innerText = content[key];
      } else {
        (child as HTMLElement).innerText = content[key];
      }
    });
  }

  static remove(element: HTMLElement) {
    element.remove();
  }

  connectedCallback() {
    if (Grain.prototype.onClick !== this.onClick) {
      this.addEventListener("click", this.onClick.bind(this));
    }
    if (Grain.prototype.onChange !== this.onChange) {
      this.addEventListener("change", this.onChange.bind(this));
    }
    if (Grain.prototype.onInput !== this.onInput) {
      this.addEventListener("input", this.onInput.bind(this));
    }
    if (Grain.prototype.onMouseOver !== this.onMouseOver) {
      this.addEventListener("mouseover", this.onMouseOver.bind(this));
    }
    if (Grain.prototype.onMouseOut !== this.onMouseOut) {
      this.addEventListener("mouseout", this.onMouseOut.bind(this));
    }
    if (Grain.prototype.onKeyDown !== this.onKeyDown) {
      this.addEventListener("keydown", this.onKeyDown.bind(this));
    }
    if (Grain.prototype.onKeyUp !== this.onKeyUp) {
      this.addEventListener("keyup", this.onKeyUp.bind(this));
    }
  }

  disconnectedCallback() {
    if (Grain.prototype.onClick !== this.onClick) {
      this.removeEventListener("click", this.onClick.bind(this));
    }
    if (Grain.prototype.onChange !== this.onChange) {
      this.removeEventListener("change", this.onChange.bind(this));
    }
    if (Grain.prototype.onInput !== this.onInput) {
      this.removeEventListener("input", this.onInput.bind(this));
    }
    if (Grain.prototype.onMouseOver !== this.onMouseOver) {
      this.removeEventListener("mouseover", this.onMouseOver.bind(this));
    }
    if (Grain.prototype.onMouseOut !== this.onMouseOut) {
      this.removeEventListener("mouseout", this.onMouseOut.bind(this));
    }
    if (Grain.prototype.onKeyDown !== this.onKeyDown) {
      this.removeEventListener("keydown", this.onKeyDown.bind(this));
    }
    if (Grain.prototype.onKeyUp !== this.onKeyUp) {
      this.removeEventListener("keyup", this.onKeyUp.bind(this));
    }
  }

  static mount(name: string, constructor: CustomElementConstructor) {
    customElements.define(name, constructor);
  }

  private static async fetcher(
    url: string,
    method: Method,
    data: Record<string, any>
  ) {
    loading.start();
    const fullUrl = new URL(window.origin, url);
    const response = await fetch(fullUrl, {
      method: method,
      body: JSON.stringify(data),
    });
    loading.end();
    return response;
  }

  static async delete(
    url: string,
    data: Record<string, any>,
    logic?: (data: Response) => void | Promise<void>
  ) {
    const response = await Grain.fetcher(url, "DELETE", data);
    if (logic) {
      await Promise.resolve(logic(response));
    }
  }

  static async put(
    url: string,
    data: Record<string, any>,
    logic?: (data: Response) => void | Promise<void>
  ) {
    const response = await Grain.fetcher(url, "PUT", data);
    if (logic) {
      await Promise.resolve(logic(response));
    }
  }

  static async post(
    url: string,
    data: Record<string, any>,
    logic?: (data: Response) => void | Promise<void>
  ) {
    const response = await Grain.fetcher(url, "POST", data);
    if (logic) {
      await Promise.resolve(logic(response));
    }
  }

  static async get(
    url: string,
    data: Record<string, any>,
    logic?: (data: Response) => void | Promise<void>
  ) {
    const response = await Grain.fetcher(url, "GET", data);
    if (logic) {
      await Promise.resolve(logic(response));
    }
  }

  static async hypermedia(
    url: string,
    method: Method,
    data: Record<string, any>,
    logic?: (text: string) => void | Promise<void>
  ) {
    const response = await Grain.fetcher(url, method, data);
    const text = await response.text();
    if (logic) {
      await Promise.resolve(logic(text));
    }
  }
}
