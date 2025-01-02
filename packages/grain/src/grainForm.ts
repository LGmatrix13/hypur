import { loading } from "./loading";

export class GrainForm<
  FData extends Record<string, any> = Record<string, any>
> extends HTMLElement {
  constructor() {
    super();
    const child = this.firstChild as HTMLFormElement;
    child.addEventListener("submit", async (event) => {
      event.preventDefault();
      const method = child.getAttribute("method") as string;
      const action = child.getAttribute("action") as string;
      const formData = new FormData(child);
      const data: Record<string, any> = {};
      formData.forEach((value, key) => {
        data[key] = value;
      });
      const url = new URL(window.location.origin, action);
      const prepardData = await Promise.resolve(
        this.handlePrepareData(data as FData)
      );
      await Promise.resolve(this.handleData(prepardData));
      const response = await this.fetcher(url, method, formData);
      await Promise.resolve(this.handleResponse(response));
    });
  }

  private async fetcher(url: URL, method: string, formData: FormData) {
    loading.start();
    const data = await fetch(url, {
      method: method,
      body: formData,
    });
    loading.end();
    return data;
  }

  handlePrepareData(data: FData): FData | Promise<FData> {
    return data;
  }
  handleData(data: FData): void | Promise<void> {}
  handleResponse(response: Response): void | Promise<void> {}

  static mount(name: string, constructor: CustomElementConstructor) {
    customElements.define(name, constructor);
  }
}
