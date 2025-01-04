import { loading } from "./loading";

export class FormGrain<
  FData extends Record<string, any> = Record<string, any>
> {
  private static async fetcher(url: URL, method: string, formData: FormData) {
    loading.start();
    const data = await fetch(url, {
      method: method,
      body: formData,
    });
    loading.end();
    return data;
  }

  beforeSubmit(data: FData): FData | Promise<FData> {
    return data;
  }
  onSubmit(data: FData): void | Promise<void> {}
  afterSubmit(response: Response): void | Promise<void> {}

  static mount(id: string, constructor: typeof FormGrain) {
    const formGrain = new constructor();
    const form = document.getElementById(id) as HTMLFormElement;
    if (!form) {
      throw new Error(`FormGrain could not find ${id}`);
    }
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const method = form.getAttribute("method");
      const action = form.getAttribute("action");
      const formData = new FormData(form);
      const data: Record<string, any> = {};
      formData.forEach((value, key) => {
        data[key] = value;
      });
      if (method && action) {
        const url = new URL(window.location.origin, action);
        const prepardData = await Promise.resolve(formGrain.beforeSubmit(data));
        await Promise.resolve(formGrain.onSubmit(prepardData));
        const response = await this.fetcher(url, method, formData);
        await Promise.resolve(formGrain.afterSubmit(response));
      } else {
        const prepardData = await Promise.resolve(formGrain.beforeSubmit(data));
        await Promise.resolve(formGrain.onSubmit(prepardData));
      }
    });
  }
}
