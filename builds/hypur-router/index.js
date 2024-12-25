// src/fetcher.ts
async function fetcher(url) {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "text/html; charset=utf-8"
    }
  });
  const html = await response.text();
  return html;
}

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

// src/links.ts
document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(`a[hypur-link="true"]`);
  const baseUrl = window.location.origin;
  links.forEach((link) => {
    const element = link;
    const href = element.getAttribute("href");
    if (href === null) {
      throw new Error(`hypur link of id ${element.id} does not have an href attribute`);
    }
    const url = new URL(href, baseUrl);
    element.addEventListener("click", async (event) => {
      loading.start();
      event.preventDefault();
      const html = await fetcher(url);
      document.body.innerHTML = html;
      loading.end();
    });
  });
});
