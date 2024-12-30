import { loading } from "./loading";

export class GrainForm<
  FData extends Record<string, any> = Record<string, any>
> {
  base: HTMLFormElement;

  constructor(name: string) {
    const baseElement = document.querySelector(`form[hypur=${name}]`);
    if (baseElement === null) {
      throw new Error(`HTMLElement ${name} does not exist`);
    }
    this.base = baseElement as HTMLFormElement;
    this.base.addEventListener("submit", async (event) => {
      event.preventDefault();
      const method = this.base.getAttribute("method") as string;
      const action = this.base.getAttribute("action") as string;
      const formData = new FormData(this.base);
      const data: Record<string, any> = {};
      formData.forEach((value, key) => {
        data[key] = value;
      });
      const url = new URL(window.location.origin, action);
      await Promise.resolve(this.handleData(data as FData));
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

  handleData(data: FData): void | Promise<void> {}
  handleResponse(response: Response): void | Promise<void> {}
}
