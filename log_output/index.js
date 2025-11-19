import fs from "node:fs";
import http from "node:http";

const logFile = "/usr/src/app/data/log.txt";
const infoFile = "/usr/src/app/config/info.txt";

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
  if (req.url === "/") {
    let logText = "";
    let infoText = "";

    try {
      logText = fs.readFileSync(logFile, "utf8").trim();
    } catch {
      logText = "log.txt not found";
    }

    try {
      infoText = fs.readFileSync(infoFile, "utf8").trim();
    } catch {
      infoText = "info.txt not found";
    }

    const pings = await getPings();

    const info = `file content: ${infoText}`;
    const variable = `env variable: MESSAGE=${process.env.MESSAGE}`;
    const counter = `Ping / pongs: ${pings}`;

    const result = `${info}\n${variable}\n${logText}\n${counter}`;

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
