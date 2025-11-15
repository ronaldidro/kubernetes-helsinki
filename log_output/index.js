import http from 'node:http';

const randomId = crypto.randomUUID();
let currentTimestamp = new Date().toISOString();

setInterval(() => {
  currentTimestamp = new Date().toISOString();
  console.log(`${currentTimestamp}: ${randomId}`);
}, 5000);


const server = http.createServer((req, res) => {
  if (req.url === '/status') {
    const response = {
      timestamp: currentTimestamp,
      randomId: randomId
    };
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(response));
  } else {
    res.writeHead(404);
    res.end("Not found");
  }
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
