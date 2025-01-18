declare global {
  interface Window {
    HYPUR_CONTEXT: Record<string, unknown>;
  }
}

export class Context<T extends unknown> {
  private readonly key: string;

  constructor(key: string, value: T) {
    this.key = key;
    if (!window.HYPUR_CONTEXT) {
      window.HYPUR_CONTEXT = {};
    }
    if (!window.HYPUR_CONTEXT[key]) {
      window.HYPUR_CONTEXT[key] = value;
    }
  }

  get() {
    return window.HYPUR_CONTEXT[this.key] as T;
  }

  set(value: T) {
    window.HYPUR_CONTEXT[this.key] = value;
  }

  clear() {
    delete window.HYPUR_CONTEXT[this.key];
  }
}
