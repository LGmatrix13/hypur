window.HYPUR = { LOADING: !1 };
function R() {
  window.HYPUR.LOADING = !0;
}
function c() {
  window.HYPUR.LOADING = !1;
}
var w = { start: R, end: c };
async function Y(o) {
  return await (
    await fetch(o, {
      method: "GET",
      headers: { "Content-Type": "text/html; charset=utf-8" },
    })
  ).text();
}
function I() {
  let o = Array.from(document.getElementsByTagName("a")),
    A = window.location.origin;
  o.filter((D) => D.getAttribute("hypur-link") !== "false").forEach((D) => {
    let H = D,
      N = H.getAttribute("href");
    if (N === null)
      throw new Error(
        `hypur link of id ${H.id} does not have an href attribute`
      );
    let O = new URL(N, A),
      P = H.cloneNode(!0);
    H.replaceWith(P),
      P.addEventListener("click", async (G) => {
        w.start(), G.preventDefault();
        let L = await Y(O);
        history.pushState(null, "", O.href),
          (document.body.innerHTML = L),
          I(),
          w.end();
      });
  });
}
document.addEventListener("DOMContentLoaded", () => {
  I();
});
window.addEventListener("popstate", async () => {
  w.start();
  let o = new URL(window.location.href),
    A = await Y(o);
  (document.body.innerHTML = A), I(), w.end();
});
