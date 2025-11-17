import http from 'node:http';
import fs from 'node:fs';

const file = '/usr/src/app/data/log.txt';

async function getPings() {
  try {
    const response = await fetch("http://ping-pong-svc:2530/pings");

    if (!response.ok) throw new Error("Service error");

    const data = await response.json();
    return data.counter ?? "unknown";
  } catch (err) {
    console.error("Error connecting ping-pong service:", err.message);
    return "unavailable";
  }
}

const server = http.createServer(async (req, res) => {
  if (req.url === '/') {
    let content = "";

    try {
      content = fs.readFileSync(file, 'utf8');
    } catch (err) {
      content = "No data written yet";
    }

    const pings = await getPings();
    const result = `${content}\nPing / pongs: ${pings}\n`;

    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(result);
  } else {
    res.writeHead(404);
    res.end("Not found");
  }
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
