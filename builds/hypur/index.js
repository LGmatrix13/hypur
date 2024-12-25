// src/loading.ts
window.HYPUR = {
  LOADING: false
};
function start() {
  window.HYPUR.LOADING = true;
}
function end() {
  window.HYPUR.LOADING = false;
}
var loading = {
  start,
  end
};

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
  const baseElement = document.querySelector(`${tagName}[hypur="${name}"]`);
  if (!baseElement) {
    throw new Error(`${tagName} HTMLElement element ${name} does not exist`);
  }
  return new HypurElement(name, baseElement, state);
}
function element(name, state) {
  const baseElement = document.querySelector(`[hypur="${name}"]`);
  if (!baseElement) {
    throw new Error(`HTMLElement ${name} does not exist`);
  }
  return new HypurElement(name, baseElement, state);
}
async function fetcher(url, method, baseElement) {
  loading.start();
  const data = await fetch(url, {
    method,
    body: stateStore.get(baseElement)
  });
  loading.end();
  return data;
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
        const child = this.baseElement.querySelector(`[hypur="${key}"]`);
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
  get parent() {
    const parent = this.baseElement.parentElement;
    if (!parent) {
      throw new Error(`HypurElement ${this.name} does not have parent`);
    }
    return parent;
  }
  duplicate() {
    const clone = this.baseElement.cloneNode(true);
    const parent = this.baseElement.parentNode;
    if (!parent) {
      throw new Error(`HypurElement with id ${this.baseElement.id} does not have parent to run duplicate`);
    }
    this.baseElement.parentNode?.appendChild(clone);
  }
  remove() {
    this.baseElement.remove();
  }
  async delete(url, logic) {
    const data = await fetcher(url, "DELETE", this.baseElement);
    if (logic) {
      await Promise.resolve(logic(data));
    }
  }
  async put(url, logic) {
    const data = await fetcher(url, "PUT", this.baseElement);
    if (logic) {
      await Promise.resolve(logic(data));
    }
  }
  async post(url, logic) {
    const data = await fetcher(url, "POST", this.baseElement);
    if (logic) {
      await Promise.resolve(logic(data));
    }
  }
  async get(url, logic) {
    const data = await fetcher(url, "GET", this.baseElement);
    if (logic) {
      await Promise.resolve(logic(data));
    }
  }
}
// src/elements.ts
function elements(name, state) {
  const baseElements = document.querySelectorAll(`[hypur="${name}"]`);
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
  append(state) {
    const last = this[this.length - 1];
    const clone = new HypurElement(last.name, last.baseElement, state).bind();
    clone.setState(() => state);
    this.append(clone);
  }
}
// src/onLoad.ts
function onLoad(logic) {
  document.addEventListener("DOMContentLoaded", logic);
}

// src/index.ts
var loading2 = window.HYPUR.LOADING;
export {
  section,
  p,
  onLoad,
  loading2 as loading,
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
