// src/element.ts
function p(name, state) {
  return element(name, state, "p");
}
function button(name, state) {
  return element(name, state, "button");
}
function section(name, state) {
  return element(name, state, "section");
}
function h1(name, state) {
  return element(name, state, "h1");
}
function h2(name, state) {
  return element(name, state, "h2");
}
function h3(name, state) {
  return element(name, state, "h2");
}
function div(name, state) {
  return element(name, state, "div");
}
function element(name, state, tagName) {
  const baseElement = document.querySelector(`${tagName}[kent="${name}"]`);
  if (!baseElement) {
    throw new Error(`${tagName} element ${name} does not exist`);
  }
  return new KentElement(baseElement, state);
}

class KentElement {
  baseElement;
  bindState = false;
  constructor(baseElement, state) {
    this.baseElement = baseElement;
    baseElement.dataset["state"] = JSON.stringify(state);
  }
  get element() {
    return this.baseElement;
  }
  get state() {
    return JSON.parse(this.baseElement.dataset.state);
  }
  setState(callback) {
    this.state = { ...this.state, ...callback(this.state) };
  }
  set state(newState) {
    this.baseElement.dataset.state = JSON.stringify(newState);
    if (this.bindState) {
      Object.keys(newState).forEach((key) => {
        const child = this.baseElement.querySelector(`[kent="${key}"]`);
        child.innerText = newState[key] && newState[key];
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
  duplicate() {
    const clone = this.baseElement.cloneNode(true);
    const parent = this.baseElement.parentNode;
    if (!parent) {
      throw new Error(
        `KentElement with id ${this.baseElement.id} does not have parent to run duplicate`
      );
    }
    this.baseElement.parentNode?.appendChild(clone);
  }
  remove() {
    this.baseElement.remove();
  }
  async fetcher(url, method) {
    const data = await fetch(url, {
      method,
      body: this.baseElement.dataset.state,
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
  const elements2 = Array.from(baseElements).map(
    (element2) => new KentElement(element2, state)
  );
  return new KentElements(elements2);
}

class KentElements extends Array {
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
    const clone = new KentElement(last.baseElement, last.state);
    clone.spread(...values);
    this.append(clone);
  }
}
// src/onMount.ts
function onMount(logic) {
  document.addEventListener("DOMContentLoaded", logic);
}
export {
  section,
  p,
  onMount,
  h3,
  h2,
  h1,
  elements,
  element,
  div,
  button,
  KentElements,
  KentElement,
};

onMount(() => {
  const counter = div("clicker", {
    count: 0,
    message: "",
  });

  const btn = button("count");
  counter.bind();

  btn.onClick(() => {
    counter.setState((prev) => ({
      message: `Clicked ${prev.count + 1}`,
      count: prev.count + 1,
    }));
  });

  const likeButtons = elements("like-button", {
    liked: false,
  });

  likeButtons.onClick((self) => {
    self.setState((prev) => ({
      liked: !prev.liked,
    }));
    if (self.state.liked) {
      self.element.innerText = "Like?";
    } else {
      self.element.innerText = "Liked!";
    }
  });
});
