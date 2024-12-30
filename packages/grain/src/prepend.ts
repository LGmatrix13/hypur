import { Grain, stateStore } from "./grain";

function grain<
  TState extends Record<string, any> = Record<string, any>,
  EState extends Record<string, any> = Record<string, any>
>(target: Grain<TState>, element: Grain<EState>, content: EState) {
  const clone = element.base.cloneNode(true) as HTMLElement;

  if (content) {
    Object.keys(content).forEach((key) => {
      const child = clone.querySelector(`[hypur="${key}"]`);
      if (child === null) {
        throw new Error(`Grain of name ${key} could not be found`);
      }
      (child as HTMLElement).innerText = content[key];
    });
  }

  element.listeners.forEach((listener) => {
    clone.addEventListener(listener.eventType, (event) =>
      listener.action(event, (content || {}) as EState)
    );
  });

  stateStore.set(clone, content || {});
  target.base.prepend(clone);
}
function hypermedia<
  TState extends Record<string, any> = Record<string, any>,
  EState extends Record<string, any> = Record<string, any>
>(target: Grain<TState>, element: Grain<EState>, content: string) {
  const clone = element.base.cloneNode(true) as HTMLElement;
  clone.innerHTML = content;
  element.listeners.forEach((listener) => {
    clone.addEventListener(listener.eventType, (event) =>
      listener.action(event, (content || {}) as EState)
    );
  });
  stateStore.set(clone, content || {});
  target.base.prepend(clone);
}

export const prepend = {
  grain,
  hypermedia,
};
