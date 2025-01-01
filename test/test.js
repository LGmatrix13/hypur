// ../builds/grain/index.js
window.HYPUR = { LOADING: false };
var i = new WeakMap;
var p = new WeakMap;
var l = new WeakMap;

class s {
  name;
  base;
  onClick(e) {
  }
  onChange(e) {
  }
  onInput(e) {
  }
  onMouseOver(e) {
  }
  onMouseOut(e) {
  }
  onKeyDown(e) {
  }
  onKeyUp(e) {
  }
  constructor(e, t) {
    this.name = e, this.base = t || s.last(e).base, !t && y(this);
  }
  mount() {
    s.all(this.name).forEach((e) => new s(this.name, e.base));
  }
  innerText(e) {
    this.base.innerText = e;
  }
  innerHTML(e) {
    this.base.innerHTML = e;
  }
  outerHTML(e) {
    this.base.outerHTML = e;
  }
  static within(e, t) {
    let o = e.querySelector(`[grain="${t}"]`);
    if (!o)
      throw new Error(`No Grain of name ${t} found within requested element`);
    return new s(t, o);
  }
  static last(e) {
    let t = Array.from(document.querySelectorAll(`[grain="${e}"]`));
    if (!t.length)
      throw new Error(`No Grain of name ${e} could be found`);
    let o = t[t.length - 1];
    return new s(e, o);
  }
  static first(e) {
    let t = document.querySelector(`[grain="${e}"]`);
    if (!t)
      throw new Error(`No Grain of name ${e} could be found`);
    return new s(e, t);
  }
  static all(e) {
    let t = Array.from(document.querySelectorAll(`[grain="${e}"]`));
    if (!t.length)
      throw new Error(`No Grain of name ${e} could be found`);
    return t.map((o) => new s(e, o));
  }
  static append(e, t) {
    e.base.append(t.base);
  }
  static prepend(e, t) {
    e.base.prepend(t.base);
  }
}
function y(e) {
  let t = l.get(e.base) || [];
  if (s.prototype.onClick !== e.onClick)
    e.base.addEventListener("click", e.onClick.bind(e)), t.push({ eventType: "click", logic: e.onClick.bind(e) });
  if (s.prototype.onChange !== e.onChange)
    e.base.addEventListener("change", e.onChange.bind(e)), t.push({ eventType: "change", logic: e.onChange.bind(e) });
  if (s.prototype.onInput !== e.onInput)
    e.base.addEventListener("input", e.onInput.bind(e)), t.push({ eventType: "input", logic: e.onInput.bind(e) });
  if (s.prototype.onMouseOver !== e.onMouseOver)
    e.base.addEventListener("mouseover", e.onMouseOver.bind(e)), t.push({ eventType: "mouseover", logic: e.onMouseOver.bind(e) });
  if (s.prototype.onMouseOut !== e.onMouseOut)
    e.base.addEventListener("mouseout", e.onMouseOut.bind(e)), t.push({ eventType: "mouseout", logic: e.onMouseOut.bind(e) });
  if (s.prototype.onKeyDown !== e.onKeyDown)
    e.base.addEventListener("keydown", e.onKeyDown.bind(e)), t.push({ eventType: "keydown", logic: e.onKeyDown.bind(e) });
  if (s.prototype.onKeyUp !== e.onKeyUp)
    e.base.addEventListener("keyup", e.onKeyUp.bind(e)), t.push({ eventType: "keyup", logic: e.onKeyUp.bind(e) });
  l.set(e.base, t);
}
var H = window.HYPUR.LOADING;

// test.ts
class AddCardButton extends s {
  constructor() {
    super("button-add-card");
  }
  onClick() {
    const newCard = s.last("card").clone();
    s.first("cards").append(newCard);
    CardButtons.refresh();
  }
}
(() => {
  CardButtons.refresh();
  new AddCardButton;
})();
