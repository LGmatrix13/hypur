import { loading } from "../../grain/src/loading";

async function fetcher(url: URL) {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "text/html; charset=utf-8",
    },
  });
  const html = await response.text();
  return html;
}

function refresh() {
  const links = Array.from(document.getElementsByTagName("a"));
  const baseUrl = window.location.origin; // Get the base URL of the current page

  links
    .filter((link) => link.getAttribute("hypur-link") !== "false")
    .forEach((link) => {
      const element = link as HTMLElement;
      const href = element.getAttribute("href");

      if (href === null) {
        throw new Error(
          `hypur link of id ${element.id} does not have an href attribute`
        );
      }

      const url = new URL(href, baseUrl);

      const newElement = element.cloneNode(true) as HTMLElement;
      element.replaceWith(newElement);

      newElement.addEventListener("click", async (event) => {
        loading.start();

        event.preventDefault();
        const html = await fetcher(url);
        history.pushState(null, "", url.href);
        document.body.innerHTML = html;

        refresh();
        loading.end();
      });
    });
}

document.addEventListener("DOMContentLoaded", () => {
  refresh();
});

window.addEventListener("popstate", async () => {
  loading.start();
  const url = new URL(window.location.href);
  const html = await fetcher(url);
  document.body.innerHTML = html;
  refresh();
  loading.end();
});
