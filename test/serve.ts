import { serve } from "bun";

serve({
  port: 3000,
  fetch(req) {
    const url = new URL(req.url);
    const path = `${Bun.fileURLToPath(import.meta.url)}/../${url.pathname}`;
    const headers = {
      "Access-Control-Allow-Origin": "*", // Allow all origins
      "Access-Control-Allow-Methods": "GET, OPTIONS", // Allow specific methods
      "Access-Control-Allow-Headers": "Content-Type", // Allow specific headers
    };

    // Handle preflight (OPTIONS) requests
    if (req.method === "OPTIONS") {
      return new Response(null, { status: 204, headers });
    }

    try {
      const file = Bun.file(path);
      return new Response(file, { headers });
    } catch {
      return new Response("File not found", { status: 404, headers });
    }
  },
});

console.log("Server running at http://localhost:3000");
