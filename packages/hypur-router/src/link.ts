import { fetcher } from "./fetcher";
import { loading } from "./loading";

export function links() {
  const links = document.querySelectorAll(`a[hypur-link="true"]`);
  const baseUrl = window.location.origin; // Get the base URL of the current page

  links.forEach((link) => {
    const element = link as HTMLElement;
    const href = element.getAttribute("href");

    if (href === null) {
      throw new Error(
        `hypur link of id ${element.id} does not have an href attribute`
      );
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
}
