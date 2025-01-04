import { Grain } from "./grain";
import { Sow } from "./sow";
import type { Method } from "./types";

export class StatefulGrain<
  TState extends Record<string, any> = Record<string, any>
> extends Grain {
  state: TState;

  constructor() {
    super();
    this.state = {} as TState;
  }

  async delete(url: string, logic?: (data: Response) => void | Promise<void>) {
    await Sow.delete(url, this.state, logic);
  }

  async put(url: string, logic?: (data: Response) => void | Promise<void>) {
    await Sow.put(url, this.state, logic);
  }

  async post(url: string, logic?: (data: Response) => void | Promise<void>) {
    await Sow.post(url, this.state, logic);
  }

  async get(url: string, logic?: (data: Response) => void | Promise<void>) {
    await Sow.get(url, this.state, logic);
  }

  async hypermedia(
    url: string,
    method: Method,
    logic?: (text: string) => void | Promise<void>
  ) {
    await Sow.hypermedia(url, method, this.state, logic);
  }
}
