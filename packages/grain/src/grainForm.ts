export class FormGrain<
  FData extends Record<string, any> = Record<string, any>
> extends HTMLElement {
  constructor() {
    super();
    const form = this.querySelector("form");
    if (form) {
      form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const method = form.getAttribute("method");
        const action = form.getAttribute("action");
        const inputs = this.querySelectorAll("input");
        const textareas = this.querySelectorAll("textarea");
        const data: Record<string, any> = {};
        inputs.forEach((input) => {
          let value = null;
          switch (input.type) {
            case "number":
              value = Number(input.value);
              break;
            default:
              value = input.value;
          }
          data[input.name] = value;
        });
        textareas.forEach((textarea) => {
          let value = null;
          switch (textarea.type) {
            case "number":
              value = Number(textarea.value);
              break;
            default:
              value = textarea.value;
          }
          data[textarea.name] = value;
        });
        if (method && action) {
          const prepardData = await Promise.resolve(
            this.beforeSubmit(data as FData)
          );
          await Promise.resolve(this.onSubmit(prepardData));
          const response = await this.fetcher(action, method, prepardData);
          await Promise.resolve(this.afterSubmit(response));
        } else {
          const prepardData = await Promise.resolve(
            this.beforeSubmit(data as FData)
          );
          await Promise.resolve(this.onSubmit(prepardData));
        }
      });
    }
  }
  private async fetcher(
    url: string,
    method: string,
    data: Record<string, unknown>
  ) {
    const response = await fetch(url, {
      method: method,
      body: JSON.stringify(data),
    });
    return response;
  }

  reset() {
    const form = this.querySelector("form");
    if (form) {
      form.reset();
    }
  }

  beforeSubmit(data: FData): FData | Promise<FData> {
    return data;
  }
  onSubmit(data: FData): void | Promise<void> {}
  afterSubmit(response: Response): void | Promise<void> {}

  static mount(tag: string, constructor: CustomElementConstructor) {
    customElements.define(tag, constructor);
  }
}
