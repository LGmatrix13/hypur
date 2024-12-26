import { HypurElement, stateStore } from "./element";

export function append(
  hypurElementTarget: HypurElement<Record<string, any>>,
  hypurElement: HypurElement<Record<string, any>>,
  modifier: (element: HypurElement<Record<string, any>>) => void
) {
  const clone = hypurElement.element.cloneNode(true);
  const newHypurElement = new HypurElement(
    hypurElement.name,
    clone as HTMLElement,
    hypurElement.defaultState
  );
  modifier(newHypurElement);
  hypurElement.listeners.forEach((listener) => {
    clone.addEventListener(listener.eventType, (event) =>
      listener.action(newHypurElement, event, hypurElement.defaultState || {})
    );
  });
  stateStore.set(clone, hypurElement.defaultState || {});
  hypurElementTarget.element.appendChild(clone);
}
