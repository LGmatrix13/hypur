export class PersistantContext<T extends unknown> {
  private readonly key: string;

  constructor(key: string, value: T) {
    this.key = key;
    if (!window.localStorage.getItem(key)) {
      window.localStorage.setItem(
        `HYPUR_PERSISTANT_CONTEXT_${key}`,
        JSON.stringify(value)
      );
    }
  }

  get() {
    const item = window.localStorage.getItem(
      `HYPUR_PERSISTANT_CONTEXT_${this.key}`
    );
    if (!item) {
      throw new Error(`No item in PersistantContext with key ${this.key}`);
    }
    return JSON.parse(item) as T;
  }

  set(value: T) {
    window.localStorage.setItem(
      `HYPUR_PERSISTANT_CONTEXT_${this.key}`,
      JSON.stringify(value)
    );
  }

  clear() {
    window.localStorage.removeItem(`HYPUR_PERSISTANT_CONTEXT_${this.key}`);
  }
}
