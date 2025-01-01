// ../builds/grain/index.js
class n extends HTMLElement {
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
      let s = t.querySelector(`[is="${o}"]`);
      if (!s) {
        let r = t.querySelector(o);
        if (!r)
          throw new Error(`Grain of nam ${o} could not be found`);
        r.innerText = e[o];
      } else
        s.innerText = e[o];
    });
  }
  static remove(t) {
    t.remove();
  }
  connectedCallback() {
    if (n.prototype.onClick !== this.onClick)
      this.addEventListener("click", this.onClick.bind(this));
    if (n.prototype.onChange !== this.onChange)
      this.addEventListener("change", this.onChange.bind(this));
    if (n.prototype.onInput !== this.onInput)
      this.addEventListener("input", this.onInput.bind(this));
    if (n.prototype.onMouseOver !== this.onMouseOver)
      this.addEventListener("mouseover", this.onMouseOver.bind(this));
    if (n.prototype.onMouseOut !== this.onMouseOut)
      this.addEventListener("mouseout", this.onMouseOut.bind(this));
    if (n.prototype.onKeyDown !== this.onKeyDown)
      this.addEventListener("keydown", this.onKeyDown.bind(this));
    if (n.prototype.onKeyUp !== this.onKeyUp)
      this.addEventListener("keyup", this.onKeyUp.bind(this));
  }
  disconnectedCallback() {
    if (n.prototype.onClick !== this.onClick)
      this.removeEventListener("click", this.onClick.bind(this));
    if (n.prototype.onChange !== this.onChange)
      this.removeEventListener("change", this.onChange.bind(this));
    if (n.prototype.onInput !== this.onInput)
      this.removeEventListener("input", this.onInput.bind(this));
    if (n.prototype.onMouseOver !== this.onMouseOver)
      this.removeEventListener("mouseover", this.onMouseOver.bind(this));
    if (n.prototype.onMouseOut !== this.onMouseOut)
      this.removeEventListener("mouseout", this.onMouseOut.bind(this));
    if (n.prototype.onKeyDown !== this.onKeyDown)
      this.removeEventListener("keydown", this.onKeyDown.bind(this));
    if (n.prototype.onKeyUp !== this.onKeyUp)
      this.removeEventListener("keyup", this.onKeyUp.bind(this));
  }
  static mount(t, e) {
    customElements.define(t, e);
  }
}
window.HYPUR = { LOADING: false };
function f() {
  window.HYPUR.LOADING = true;
}
function l() {
  window.HYPUR.LOADING = false;
}
var i = { start: f, end: l };

class y extends n {
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
  async fetcher(t, e) {
    i.start();
    let o = new URL(window.origin, t), s = await fetch(o, { method: e, body: JSON.stringify(this.state) });
    return i.end(), s;
  }
  async delete(t, e) {
    let o = await this.fetcher(t, "DELETE");
    if (e)
      await Promise.resolve(e(o));
  }
  async put(t, e) {
    let o = await this.fetcher(t, "PUT");
    if (e)
      await Promise.resolve(e(o));
  }
  async post(t, e) {
    let o = await this.fetcher(t, "POST");
    if (e)
      await Promise.resolve(e(o));
  }
  async get(t, e) {
    let o = await this.fetcher(t, "GET");
    if (e)
      await Promise.resolve(e(o));
  }
  async hypermedia(t, e, o) {
    let r = await (await this.fetcher(t, e)).text();
    if (o)
      await Promise.resolve(o(r));
  }
}
async function u(t) {
  return await (await fetch(t, { method: "GET", headers: { "Content-Type": "text/html; charset=utf-8" } })).text();
}
function p() {
  let t = Array.from(document.getElementsByTagName("a")), e = window.location.origin;
  t.filter((o) => o.getAttribute("hypur-link") !== "false").forEach((o) => {
    let s = o, r = s.getAttribute("href");
    if (r === null)
      throw new Error(`hypur link of id ${s.id} does not have an href attribute`);
    let a = new URL(r, e), d = s.cloneNode(true);
    s.replaceWith(d), d.addEventListener("click", async (h) => {
      i.start(), h.preventDefault();
      let c = await u(a);
      history.pushState(null, "", a.href), document.body.innerHTML = c, p(), i.end();
    });
  });
}
document.addEventListener("DOMContentLoaded", () => {
  p();
});
window.addEventListener("popstate", async () => {
  i.start();
  let t = new URL(window.location.href), e = await u(t);
  document.body.innerHTML = e, p(), i.end();
});
var D = window.HYPUR.LOADING;

// test.ts
class CardButton extends y {
  constructor() {
    super({
      clicks: 0
    });
  }
  onClick() {
    this.state = {
      clicks: this.state.clicks + 1
    };
    const card = n.within(this.parentElement, "card-title");
    card.innerText = `I have been clicked ${this.state.clicks} times!`;
  }
}

class AddCardButton extends n {
  constructor() {
    super();
  }
  onClick() {
    const newCard = n.last("card").cloneNode(true);
    n.spread(newCard, {
      "card-title": "New Card!",
      "card-button": "Click me, i'm new!"
    });
    n.first("cards").append(newCard);
  }
}
n.mount("button-add-card", AddCardButton);
n.mount("card-button", CardButton);
