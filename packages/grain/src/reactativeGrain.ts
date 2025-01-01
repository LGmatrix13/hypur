import { Grain } from "./grain";
import { loading } from "./loading";
import type { Method } from "./types";

export class ReactiveGrain<
  TState extends Record<string, any> = Record<string, any>
> extends Grain {
  readonly defaultState: TState;
  state: TState;

  constructor(defaultState?: TState) {
    super();
    this.defaultState = defaultState || ({} as TState);
    this.state = this.defaultState;
  }

  seedState() {
    const seedState = this.getAttribute("grain-state");
    if (!seedState) {
      throw new Error(
        `Grain could not seed state. Make sure The "grain-state" attribute is set.`
      );
    }
    this.state = JSON.parse(seedState) as TState;
  }

  private async fetcher(url: string, method: Method) {
    loading.start();
    const fullUrl = new URL(window.origin, url);
    const data = await fetch(fullUrl, {
      method: method,
      body: JSON.stringify(this.state),
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
