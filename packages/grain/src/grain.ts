export abstract class Grain extends HTMLElement {
  onClick(event: Event): void | Promise<void> {}
  onChange(event: Event): void | Promise<void> {}
  onInput(event: Event): void | Promise<void> {}
  onMouseOver(event: Event): void | Promise<void> {}
  onMouseOut(event: Event): void | Promise<void> {}
  onKeyDown(event: Event): void | Promise<void> {}
  onKeyUp(event: Event): void | Promise<void> {}

  constructor() {
    super();
  }

  private async resolver(
    handler: (event: Event) => void | Promise<void>,
    event: Event
  ) {
    try {
      await handler.call(this, event);
    } catch (error) {
      console.error("Error in handler:", error);
    }
  }

  private connectedCallback() {
    if (Grain.prototype.onClick !== this.onClick) {
      this.addEventListener("click", async (event) => {
        await this.resolver(this.onClick, event);
      });
    }
    if (Grain.prototype.onChange !== this.onChange) {
      this.addEventListener("change", async (event) => {
        await this.resolver(this.onChange, event);
      });
    }
    if (Grain.prototype.onInput !== this.onInput) {
      this.addEventListener("input", async (event) => {
        await this.resolver(this.onInput, event);
      });
    }
    if (Grain.prototype.onMouseOver !== this.onMouseOver) {
      this.addEventListener("mouseover", async (event) => {
        await this.resolver(this.onMouseOver, event);
      });
    }
    if (Grain.prototype.onMouseOut !== this.onMouseOut) {
      this.addEventListener("mouseout", async (event) => {
        await this.resolver(this.onMouseOut, event);
      });
    }
    if (Grain.prototype.onKeyDown !== this.onKeyDown) {
      this.addEventListener("keydown", async (event) => {
        await this.resolver(this.onKeyDown, event);
      });
    }
    if (Grain.prototype.onKeyUp !== this.onKeyUp) {
      this.addEventListener("keyup", async (event) => {
        await this.resolver(this.onKeyUp, event);
      });
    }
  }

  private disconnectedCallback() {
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

  static mount(tag: string, constructor: CustomElementConstructor) {
    customElements.define(tag, constructor);
  }
}
