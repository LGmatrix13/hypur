// ../builds/grain/index.js
window.HYPUR = { LOADING: false };
function m() {
  window.HYPUR.LOADING = true;
}
function y() {
  window.HYPUR.LOADING = false;
}
var r = { start: m, end: y };

class s extends HTMLElement {
  onClick(t) {
  }
  onChange(t) {
  }
  onInput(t) {
  }
  onMouseOver(t) {
  }
  onMouseOut(t) {
  }
  onKeyDown(t) {
  }
  onKeyUp(t) {
  }
  constructor() {
    super();
  }
  static within(t, e) {
    let o = t.querySelector(`[is="${e}"]`);
    if (!o)
      throw new Error(`No Grain of name ${e} found within requested element`);
    return o;
  }
  static last(t) {
    let e = Array.from(document.querySelectorAll(`[is="${t}"]`));
    if (!e.length)
      throw new Error(`No Grain of name ${t} could be found`);
    return e[e.length - 1];
  }
  static first(t) {
    let e = document.querySelector(`[is="${t}"]`);
    if (!e)
      throw new Error(`No Grain of name ${t} could be found`);
    return e;
  }
  static all(t) {
    let e = Array.from(document.querySelectorAll(`[is="${t}"]`));
    if (!e.length)
      throw new Error(`No Grain of name ${t} could be found`);
    return e;
  }
  static append(t, e) {
    t.append(e);
  }
  static prepend(t, e) {
    t.prepend(e);
  }
  static cloneNode(t) {
    return t.cloneNode(true);
  }
  static spread(t, e) {
    Object.keys(e).forEach((o) => {
      let n = t.querySelector(`[is="${o}"]`);
      if (!n) {
        let i = t.querySelector(o);
        if (!i)
          throw new Error(`Grain of nam ${o} could not be found`);
        i.innerText = e[o];
      } else
        n.innerText = e[o];
    });
  }
  static remove(t) {
    t.remove();
  }
  connectedCallback() {
    if (s.prototype.onClick !== this.onClick)
      this.addEventListener("click", this.onClick.bind(this));
    if (s.prototype.onChange !== this.onChange)
      this.addEventListener("change", this.onChange.bind(this));
    if (s.prototype.onInput !== this.onInput)
      this.addEventListener("input", this.onInput.bind(this));
    if (s.prototype.onMouseOver !== this.onMouseOver)
      this.addEventListener("mouseover", this.onMouseOver.bind(this));
    if (s.prototype.onMouseOut !== this.onMouseOut)
      this.addEventListener("mouseout", this.onMouseOut.bind(this));
    if (s.prototype.onKeyDown !== this.onKeyDown)
      this.addEventListener("keydown", this.onKeyDown.bind(this));
    if (s.prototype.onKeyUp !== this.onKeyUp)
      this.addEventListener("keyup", this.onKeyUp.bind(this));
  }
  disconnectedCallback() {
    if (s.prototype.onClick !== this.onClick)
      this.removeEventListener("click", this.onClick.bind(this));
    if (s.prototype.onChange !== this.onChange)
      this.removeEventListener("change", this.onChange.bind(this));
    if (s.prototype.onInput !== this.onInput)
      this.removeEventListener("input", this.onInput.bind(this));
    if (s.prototype.onMouseOver !== this.onMouseOver)
      this.removeEventListener("mouseover", this.onMouseOver.bind(this));
    if (s.prototype.onMouseOut !== this.onMouseOut)
      this.removeEventListener("mouseout", this.onMouseOut.bind(this));
    if (s.prototype.onKeyDown !== this.onKeyDown)
      this.removeEventListener("keydown", this.onKeyDown.bind(this));
    if (s.prototype.onKeyUp !== this.onKeyUp)
      this.removeEventListener("keyup", this.onKeyUp.bind(this));
  }
  static mount(t, e) {
    customElements.define(t, e);
  }
  static async fetcher(t, e, o) {
    r.start();
    let n = new URL(window.origin, t), i = await fetch(n, { method: e, body: JSON.stringify(o) });
    return r.end(), i;
  }
  static async delete(t, e, o) {
    let n = await s.fetcher(t, "DELETE", e);
    if (o)
      await Promise.resolve(o(n));
  }
  static async put(t, e, o) {
    let n = await s.fetcher(t, "PUT", e);
    if (o)
      await Promise.resolve(o(n));
  }
  static async post(t, e, o) {
    let n = await s.fetcher(t, "POST", e);
    if (o)
      await Promise.resolve(o(n));
  }
  static async get(t, e, o) {
    let n = await s.fetcher(t, "GET", e);
    if (o)
      await Promise.resolve(o(n));
  }
  static async hypermedia(t, e, o, n) {
    let a = await (await s.fetcher(t, e, o)).text();
    if (n)
      await Promise.resolve(n(a));
  }
}

class l extends s {
  defaultState;
  state;
  constructor(t) {
    super();
    this.defaultState = t || {}, this.state = this.defaultState;
  }
  seedState() {
    let t = this.getAttribute("grain-state");
    if (!t)
      throw new Error('Grain could not seed state. Make sure The "grain-state" attribute is set.');
    this.state = JSON.parse(t);
  }
  async delete(t, e) {
    await s.delete(t, this.state, e);
  }
  async put(t, e) {
    await s.put(t, this.state, e);
  }
  async post(t, e) {
    await s.post(t, this.state, e);
  }
  async get(t, e) {
    await s.get(t, this.state, e);
  }
  async hypermedia(t, e, o) {
    await s.hypermedia(t, e, this.state, o);
  }
}
async function u(t) {
  return await (await fetch(t, { method: "GET", headers: { "Content-Type": "text/html; charset=utf-8" } })).text();
}
function p() {
  let t = Array.from(document.getElementsByTagName("a")), e = window.location.origin;
  t.filter((o) => o.getAttribute("hypur-link") !== "false").forEach((o) => {
    let n = o, i = n.getAttribute("href");
    if (i === null)
      throw new Error(`hypur link of id ${n.id} does not have an href attribute`);
    let a = new URL(i, e), d = n.cloneNode(true);
    n.replaceWith(d), d.addEventListener("click", async (c) => {
      r.start(), c.preventDefault();
      let h = await u(a);
      history.pushState(null, "", a.href), document.body.innerHTML = h, p(), r.end();
    });
  });
}
document.addEventListener("DOMContentLoaded", () => {
  p();
});
window.addEventListener("popstate", async () => {
  r.start();
  let t = new URL(window.location.href), e = await u(t);
  document.body.innerHTML = e, p(), r.end();
});
var D = window.HYPUR.LOADING;

// test.ts
class CardButton extends l {
  constructor() {
    super({
      clicks: 0
    });
  }
  onClick() {
    this.post("/test", (response) => {
      console.log(response.text());
    });
    this.state = {
      clicks: this.state.clicks + 1
    };
    const card = s.within(this.parentElement, "card-title");
    card.innerText = `I have been clicked ${this.state.clicks} times!`;
  }
}

class AddCardButton extends s {
  constructor() {
    super();
  }
  onClick() {
    const newCard = s.last("card").cloneNode(true);
    s.spread(newCard, {
      "card-title": "New Card!",
      "card-button": "Click me, i'm new!"
    });
    s.first("cards").append(newCard);
  }
}
s.mount("button-add-card", AddCardButton);
s.mount("card-button", CardButton);
