Deno.serve({ port: 80, hostname: "0.0.0.0" }, (_req) => {
  return new Response("Hello, World!");
})