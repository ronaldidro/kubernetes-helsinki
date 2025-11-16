import http from 'node:http';
import fs from 'node:fs';

const file = '/usr/src/app/data/log.txt';

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    let content = "";

    try {
      content = fs.readFileSync(file, 'utf8');
    } catch (err) {
      content = "No data written yet";
    }

    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(content);
  } else {
    res.writeHead(404);
    res.end("Not found");
  }
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
