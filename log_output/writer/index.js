import fs from 'node:fs';

const file = '/usr/src/app/data/log.txt';
const randomId = crypto.randomUUID();

function writeLine() {
  const timestamp = new Date().toISOString();
  const line = `${timestamp}: ${randomId}\n`;
  fs.appendFileSync(file, line);
  console.log("Writer wrote:", line.trim());
}

writeLine();
setInterval(writeLine, 5000);
