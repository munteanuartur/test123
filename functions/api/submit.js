export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Only handle requests to /api/submit
    if (request.method === "POST" && url.pathname === "/api/submit") {
      try {
        const input = await request.formData();
        const data = Object.fromEntries(input.entries());

        data.access_key = "c5ca0130-819d-4f22-b234-ce4515e7380e";

        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        const result = await response.json();
        return new Response(JSON.stringify(result), {
          headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
        });

      } catch (err) {
        return new Response(err.message, { status: 500 });
      }
    }

    return new Response("Not Found", { status: 404 });
  }
};
