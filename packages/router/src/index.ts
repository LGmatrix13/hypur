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

const HISTORY: Record<
  string,
  {
    body: HTMLElement;
    title: string;
  }
> = {};

function refresh() {
  const links = Array.from(document.getElementsByTagName("a"));
  const baseUrl = window.location.origin;

  links
    .filter((link) => link.getAttribute("hypur-link") !== "false")
    .forEach((link) => {
      const element = link as HTMLElement;
      const href = element.getAttribute("href");

      if (!href) {
        throw new Error(
          `hypur link of id ${element.id} does not have an href attribute`
        );
      }

      const url = new URL(href, baseUrl);

      // Click event
      element.addEventListener("click", async (event) => {
        event.preventDefault();

        loading.start();
        const hypermedia = await fetcher(url);
        const newHtml = new DOMParser().parseFromString(
          hypermedia,
          "text/html"
        );
        document.title = newHtml.title;
        document.body.innerHTML = newHtml.body.innerHTML;
        window.history.pushState({ pathname: url.pathname }, "", url.pathname);
        HISTORY[url.pathname] = {
          title: newHtml.title,
          body: newHtml.body,
        };
        refresh(); // Reinitialize after loading new content
        loading.end();
      });
    });
}

document.addEventListener("DOMContentLoaded", () => {
  refresh();
});

window.addEventListener("popstate", (e) => {
  if (e.state) {
    const page = HISTORY[e.state.pathname];
    document.body.innerHTML = page.body.innerHTML;
    document.title = page.title;
    delete HISTORY[e.state.pathname];
  }
  refresh();
});
