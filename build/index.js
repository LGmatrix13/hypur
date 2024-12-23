// src/state.ts
function state(initialValue, singal) {
  let value = initialValue;
  function set(newValue) {
    value = newValue;
    if (singal) {
      singal(newValue);
    }
  }
  function get() {
    return value;
  }
  return {
    get,
    set
  };
}
// src/element.ts
function element(id, state2) {
  const baseElement = document.getElementById(id);
  if (!baseElement) {
    throw new Error(`Element with id ${id} does not exist`);
  }
  return new KentElement(baseElement, state2);
}

class KentElement extends HTMLElement {
  content;
  state;
  constructor(baseElement, state2) {
    super();
    Array.from(baseElement.attributes).forEach((attr) => this.setAttribute(attr.name, attr.value));
    this.innerHTML = baseElement.innerHTML;
    this.state = state2 || {};
  }
  setContent(value) {
    this.content = value;
    this.innerText = String(value);
  }
  setChildren(children) {
    this.innerHTML = children.innerHTML;
  }
  getContent() {
    return this.content;
  }
  onEvent(eventType, action) {
    this.addEventListener(eventType, (event) => {
      action(this, event);
    });
  }
  onClick(action) {
    this.onEvent("click", action);
  }
  onChange(action) {
    this.onEvent("change", action);
  }
  onInput(action) {
    this.onEvent("input", action);
  }
  onMouseOver(action) {
    this.onEvent("mouseover", action);
  }
  onMouseOut(action) {
    this.onEvent("mouseout", action);
  }
  onKeyDown(action) {
    this.onEvent("keydown", action);
  }
  onKeyUp(action) {
    this.onEvent("keyup", action);
  }
  spread(...values) {
    this.childNodes.forEach((child, index) => {
      child.textContent = values[index];
    });
  }
}
export {
  state,
  element,
  KentElement
};
