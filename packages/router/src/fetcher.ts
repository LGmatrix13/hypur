export async function fetcher(url: URL) {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "text/html; charset=utf-8",
    },
  });
  const html = await response.text();
  return html;
}
