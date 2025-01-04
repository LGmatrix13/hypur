import { loading } from "./loading";
import type { Method } from "./types";

const snapshots: Record<string, HTMLElement> = {};

export class Sow {
  static within<T extends HTMLElement = HTMLElement>(
    element: HTMLElement,
    name: string
  ) {
    const within = element.querySelector(`[sow="${name}"]`);
    if (!within) {
      throw new Error(
        `No Grain of name ${name} found within requested element`
      );
    }
    return within as T;
  }

  static last<T extends HTMLElement = HTMLElement>(name: string) {
    const all = Array.from(document.querySelectorAll(`[sow="${name}"]`));
    if (!all.length) {
      throw new Error(`No Grain of name ${name} could be found`);
    }
    const last = all[all.length - 1];
    return last as T;
  }

  static first<T extends HTMLElement = HTMLElement>(name: string) {
    return Sow.find(name) as T;
  }

  static all<T extends HTMLElement = HTMLElement>(name: string) {
    const all = Array.from(document.querySelectorAll(`[sow="${name}"]`));
    if (!all.length) {
      throw new Error(`Sow could not find ${name}`);
    }
    return all as T[];
  }

  static append<T extends HTMLElement, K extends HTMLElement>(
    element: T,
    otherElement: K
  ) {
    element.append(otherElement);
  }

  static prepend<T extends HTMLElement, K extends HTMLElement>(
    element: T,
    otherElement: K
  ) {
    element.prepend(otherElement);
  }

  static clone<T extends HTMLElement = HTMLElement>(element: HTMLElement) {
    return element.cloneNode(true) as T;
  }

  static find<T extends HTMLElement = HTMLElement>(name: string) {
    const element = document.querySelector(`[sow="${name}"]`);
    if (!element) {
      throw new Error(`Sow could not find ${name}`);
    }
    return element as T;
  }

  static snapshot(name: string) {
    const element = Sow.find(name).cloneNode(true) as HTMLElement;
    snapshots[name] = element;
  }

  static restore<T extends HTMLElement = HTMLElement>(name: string) {
    const snapshot = snapshots[name];
    if (!snapshot) {
      throw new Error(`Sow could not find snapshot ${name}`);
    }
    delete snapshots[name];
    return snapshot as T;
  }

  static spread(element: HTMLElement, content: Record<string, any>) {
    Object.keys(content).forEach((key) => {
      const child = element.querySelector(`[sow="${key}"]`);
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
