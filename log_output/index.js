import fs from "node:fs";
import http from "node:http";

const LOG_FILE = "/usr/src/app/data/log.txt";
const INFO_FILE = "/usr/src/app/config/info.txt";
const PING_PONG_URL = "http://ping-pong-svc:2530/pings";
const GREETER_URL = "http://greeter-svc:2540";

function readFileSafe(path, fallback) {
  try {
    return fs.readFileSync(path, "utf8").trim();
  } catch {
    return fallback;
  }
}

async function fetchGreeting() {
  try {
    const response = await fetch(GREETER_URL);

    if (!response.ok) throw new Error("Greeter service error");

    const data = await response.json();
    return data.greeting ?? "unknown";
  } catch (err) {
    console.error("Error connecting greeter service:", err.message);
    return "unavailable";
  }
}


async function fetchPingCount() {
  try {
    const response = await fetch(PING_PONG_URL);

    if (!response.ok) throw new Error("Service error");

    const data = await response.json();
    return data.counter ?? "unknown";
  } catch (err) {
    console.error("Error connecting ping-pong service:", err.message);
    return "unavailable";
  }
}

async function checkPingPongHealth() {
  try {
    const response = await fetch(PING_PONG_URL);
    return response.ok;
  } catch {
    return false;
  }
}

async function handleHealthz(req, res) {
  const isHealthy = await checkPingPongHealth();
  res.writeHead(isHealthy ? 200 : 500);
  res.end(isHealthy ? "ok" : "fail");
}

async function handleRoot(_, res) {
  const logText = readFileSafe(LOG_FILE, "log.txt not found");
  const infoText = readFileSafe(INFO_FILE, "info.txt not found");
  const pingCount = await fetchPingCount();
  const greeting = await fetchGreeting();

  const output = [
    `file content: ${infoText}`,
    `env variable: MESSAGE=${process.env.MESSAGE}`,
    logText,
    `Ping / pongs: ${pingCount}`,
    `greetings: ${greeting}`,
  ].join("\n");

  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end(output);
}

const server = http.createServer(async (req, res) => {
  switch (req.url) {
    case "/healthz":
      return handleHealthz(req, res);

    case "/":
      return handleRoot(req, res);

    default:
      res.writeHead(404);
      res.end("Not found");
  }
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
