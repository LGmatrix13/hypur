// src/element.ts
function element(args) {
  const { id, state } = args;
  const baseElement = document.getElementById(id);
  if (!baseElement) {
    throw new Error(`Element with id ${id} does not exist`);
  }
  return new KentElement(baseElement, state);
}

class KentElement extends HTMLElement {
  state;
  constructor(baseElement, state) {
    super();
    Array.from(baseElement.attributes).forEach((attr) => this.setAttribute(attr.name, attr.value));
    this.innerHTML = baseElement.innerHTML;
    this.state = state || {};
  }
  setChildren(children) {
    this.innerHTML = children.innerHTML;
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
  duplicate() {
    const clone = this.cloneNode(true);
    const parent = this.parentNode;
    if (!parent) {
      throw new Error(`KentElement with id ${this.id} does not have parent to run duplicate`);
    }
    this.parentNode?.appendChild(clone);
  }
  async fetcher(url, method) {
    const data = await fetch(url, {
      method,
      body: JSON.stringify({
        state: this.state
      })
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
function elements(args) {
  const { className } = args;
  const baseElements = document.getElementsByClassName(className);
  if (!baseElements.length) {
    throw new Error(`Elements with class ${className} does not exist`);
  }
  const elements2 = Array.from(baseElements).map((element2) => new KentElement(element2));
  return new KentElements(elements2);
}

class KentElements extends Array {
  constructor(elements2) {
    super();
    this.push(...elements2);
  }
  onEvent(eventType, action) {
    this.forEach((element2) => {
      element2.addEventListener(eventType, (event) => {
        action(element2, event);
      });
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
  append(...values) {
    const last = this[this.length - 1];
    const clone = new KentElement(last, last.state);
    clone.spread(...values);
    this.append(clone);
  }
}
export {
  elements,
  element,
  KentElements,
  KentElement
};
