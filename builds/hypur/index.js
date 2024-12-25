// src/element.ts
var stateStore = new WeakMap;
function p(name, state) {
  return elementByTag(name, state, "p");
}
function button(name, state) {
  return elementByTag(name, state, "button");
}
function section(name, state) {
  return elementByTag(name, state, "section");
}
function h1(name, state) {
  return elementByTag(name, state, "h1");
}
function h2(name, state) {
  return elementByTag(name, state, "h2");
}
function h3(name, state) {
  return elementByTag(name, state, "h2");
}
function div(name, state) {
  return elementByTag(name, state, "div");
}
function elementByTag(name, state, tagName) {
  const baseElement = document.querySelector(`${tagName}[kent="${name}"]`);
  if (!baseElement) {
    throw new Error(`${tagName} HTMLElement element ${name} does not exist`);
  }
  return new HypurElement(name, baseElement, state);
}
function element(name, state) {
  const baseElement = document.querySelector(`[kent="${name}"]`);
  if (!baseElement) {
    throw new Error(`HTMLElement ${name} does not exist`);
  }
  return new HypurElement(name, baseElement, state);
}

class HypurElement {
  name;
  baseElement;
  bindState = false;
  key;
  constructor(name, baseElement, state) {
    this.name = name;
    this.baseElement = baseElement;
    const key = this.baseElement.dataset.key;
    if (key)
      this.key = Number(key);
    stateStore.set(this.baseElement, state);
  }
  get element() {
    return this.baseElement;
  }
  get state() {
    return stateStore.get(this.baseElement);
  }
  setState(callback) {
    this.state = { ...this.state, ...callback(this.state) };
  }
  set state(newState) {
    stateStore.set(this.baseElement, newState);
    if (this.bindState) {
      Object.keys(newState).forEach((key) => {
        const child = this.baseElement.querySelector(`[kent="${key}"]`);
        if (child !== null) {
          child.innerText = newState[key] && newState[key];
        }
      });
    }
  }
  setChildren(children) {
    this.baseElement.innerHTML = children.baseElement.innerHTML;
  }
  onEvent(eventType, action) {
    this.baseElement.addEventListener(eventType, (event) => {
      action(this, event);
    });
  }
  bind() {
    this.bindState = true;
    return this;
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
    this.baseElement.childNodes.forEach((child, index) => {
      child.textContent = values[index];
    });
  }
  get parent() {
    const parent = this.baseElement.parentElement;
    if (!parent) {
      throw new Error(`KentElement ${this.name} does not have parent`);
    }
    return parent;
  }
  duplicate() {
    const clone = this.baseElement.cloneNode(true);
    const parent = this.baseElement.parentNode;
    if (!parent) {
      throw new Error(`KentElement with id ${this.baseElement.id} does not have parent to run duplicate`);
    }
    this.baseElement.parentNode?.appendChild(clone);
  }
  remove() {
    this.baseElement.remove();
  }
  async fetcher(url, method) {
    const data = await fetch(url, {
      method,
      body: this.baseElement.dataset.state
    });
    return data;
  }
  async delete(url, logic) {
    const data = await this.fetcher(url, "DELETE");
    if (logic) {
      await Promise.resolve(logic(data));
    }
  }
  async put(url, logic) {
    const data = await this.fetcher(url, "PUT");
    if (logic) {
      await Promise.resolve(logic(data));
    }
  }
  async post(url, logic) {
    const data = await this.fetcher(url, "POST");
    if (logic) {
      await Promise.resolve(logic(data));
    }
  }
  async get(url, logic) {
    const data = await this.fetcher(url, "GET");
    if (logic) {
      await Promise.resolve(logic(data));
    }
  }
}
// src/elements.ts
function elements(name, state) {
  const baseElements = document.querySelectorAll(`[kent="${name}"]`);
  if (!baseElements.length) {
    throw new Error(`Elements ${name} do not exist`);
  }
  const elements2 = Array.from(baseElements).map((element2) => new HypurElement(name, element2, state));
  return new HypurElements(elements2);
}

class HypurElements extends Array {
  constructor(elements2) {
    super();
    this.push(...elements2);
  }
  onEvent(eventType, action) {
    this.forEach((element2) => {
      element2.baseElement.addEventListener(eventType, (event) => {
        action(element2, event);
      });
    });
  }
  bind() {
    this.forEach((element2) => {
      element2.bind();
    });
    return this;
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
  append(...values) {
    const last = this[this.length - 1];
    const clone = new HypurElement(last.name, last.baseElement, last.state);
    clone.spread(...values);
    this.append(clone);
  }
}
// src/onLoad.ts
function onLoad(logic) {
  document.addEventListener("DOMContentLoaded", logic);
}
export {
  section,
  p,
  onLoad,
  h3,
  h2,
  h1,
  elements,
  element,
  div,
  button,
  HypurElements,
  HypurElement
};
