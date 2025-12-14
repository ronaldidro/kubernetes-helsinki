import http from "node:http";

const version = process.env.VERSION;

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({
      greeting: `Hello from ${version}`
    }));
    return;
  }

  res.writeHead(404);
  res.end("Not found");
});

server.listen(4000, () => {
  console.log("Greeter service running on port 4000");
});
