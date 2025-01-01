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

  async delete(url: string, logic?: (data: Response) => void | Promise<void>) {
    await Grain.delete(url, this.state, logic);
  }

  async put(url: string, logic?: (data: Response) => void | Promise<void>) {
    await Grain.put(url, this.state, logic);
  }

  async post(url: string, logic?: (data: Response) => void | Promise<void>) {
    await Grain.post(url, this.state, logic);
  }

  async get(url: string, logic?: (data: Response) => void | Promise<void>) {
    await Grain.get(url, this.state, logic);
  }

  async hypermedia(
    url: string,
    method: Method,
    logic?: (text: string) => void | Promise<void>
  ) {
    await Grain.hypermedia(url, method, this.state, logic);
  }
}
