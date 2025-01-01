import { loading } from "./loading";
import type { Method } from "./types";

export class Grain extends HTMLElement {
  onClick(event: Event): void {}
  onChange(event: Event): void {}
  onInput(event: Event): void {}
  onMouseOver(event: Event): void {}
  onMouseOut(event: Event): void {}
  onKeyDown(event: Event): void {}
  onKeyUp(event: Event): void {}

  constructor() {
    super();
  }

  connectedCallback() {
    if (Grain.prototype.onClick !== this.onClick) {
      this.addEventListener("click", this.onClick.bind(this));
    }
    if (Grain.prototype.onChange !== this.onChange) {
      this.addEventListener("change", this.onChange.bind(this));
    }
    if (Grain.prototype.onInput !== this.onInput) {
      this.addEventListener("input", this.onInput.bind(this));
    }
    if (Grain.prototype.onMouseOver !== this.onMouseOver) {
      this.addEventListener("mouseover", this.onMouseOver.bind(this));
    }
    if (Grain.prototype.onMouseOut !== this.onMouseOut) {
      this.addEventListener("mouseout", this.onMouseOut.bind(this));
    }
    if (Grain.prototype.onKeyDown !== this.onKeyDown) {
      this.addEventListener("keydown", this.onKeyDown.bind(this));
    }
    if (Grain.prototype.onKeyUp !== this.onKeyUp) {
      this.addEventListener("keyup", this.onKeyUp.bind(this));
    }
  }

  disconnectedCallback() {
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

  static mount(name: string, constructor: CustomElementConstructor) {
    customElements.define(name, constructor);
  }
}
