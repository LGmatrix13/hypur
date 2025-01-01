import { loading } from "./loading";
import type { Method } from "./types";

export class Sow {
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

  static append(element: HTMLElement, otherElement: HTMLElement) {
    element.append(otherElement);
  }

  static prepend(element: HTMLElement, otherElement: HTMLElement) {
    element.prepend(otherElement);
  }

  static clone(element: HTMLElement) {
    return element.cloneNode(true) as HTMLElement;
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
    const response = await Sow.fetcher(url, "DELETE", data);
    if (logic) {
      await Promise.resolve(logic(response));
    }
  }

  static async put(
    url: string,
    data: Record<string, any>,
    logic?: (data: Response) => void | Promise<void>
  ) {
    const response = await Sow.fetcher(url, "PUT", data);
    if (logic) {
      await Promise.resolve(logic(response));
    }
  }

  static async post(
    url: string,
    data: Record<string, any>,
    logic?: (data: Response) => void | Promise<void>
  ) {
    const response = await Sow.fetcher(url, "POST", data);
    if (logic) {
      await Promise.resolve(logic(response));
    }
  }

  static async get(
    url: string,
    data: Record<string, any>,
    logic?: (data: Response) => void | Promise<void>
  ) {
    const response = await Sow.fetcher(url, "GET", data);
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
    const response = await Sow.fetcher(url, method, data);
    const text = await response.text();
    if (logic) {
      await Promise.resolve(logic(text));
    }
  }
}
