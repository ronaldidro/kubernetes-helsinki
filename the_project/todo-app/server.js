const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

const port = process.env.PORT || 3000;
const folder = "/usr/src/app/files";
const imagePath = path.join(folder, "image.jpg");
const timestampPath = path.join(folder, "timestamp.txt");
const todos = ["Learn JavaScript", "Learn React", "Build a project"];

async function downloadImage() {
  console.log("Download image...");

  const response = await fetch("https://picsum.photos/1200");
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  fs.writeFileSync(imagePath, buffer);
  fs.writeFileSync(timestampPath, Date.now().toString());
}

async function ensureImage() {
  const imageExists = fs.existsSync(imagePath);
  const tsExists = fs.existsSync(timestampPath);

  if (!imageExists || !tsExists) {
    await downloadImage();
    return;
  }

  const timestamp = Number(fs.readFileSync(timestampPath, "utf8"));
  const now = Date.now();
  const diffMs = now - timestamp;

  const tenMin = 10 * 60 * 1000;

  if (diffMs >= tenMin) {
    console.log("Time finished");
    await downloadImage();
  }
}

app.get("/", async (req, res) => {
  await ensureImage();

  res.send(`
    <html>
      <head><title>The project App</title></head>
      <body>
        <h1>The project App</h1>
        <img src="/image" style="width: 300px; height: 300px; margin-bottom: 10px" />
     	<br>
        <input id="todo" type="text" maxlength="140">
        <button>Create todo</button>
	<ul>
	  ${todos.map(todo => `<li>${todo}</li>`).join("")}
	</ul>
        <footer style="margin-top: 20px;">
          <small>DevOps with Kubernetes 2025</small>
        </footer>
      </body>
    </html>
  `);
});

app.get("/image", (req, res) => {
  res.sendFile(imagePath);
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
