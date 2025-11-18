import fs from "fs/promises";

async function downloadImage(imagePath, timestampPath) {
  console.log("Downloading image...");

  const response = await fetch("https://picsum.photos/1200");
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  await fs.writeFile(imagePath, buffer);
  await fs.writeFile(timestampPath, Date.now().toString());
}

export async function ensureImage(imagePath, timestampPath) {
  let imageExists = true;
  let tsExists = true;

  try {
    await fs.access(imagePath);
  } catch {
    imageExists = false;
  }

  try {
    await fs.access(timestampPath);
  } catch {
    tsExists = false;
  }

  if (!imageExists || !tsExists) {
    await downloadImage(imagePath, timestampPath);
    return;
  }

  console.log("Image found");

  const timestamp = Number(fs.readFile(timestampPath, "utf8"));
  const diffMs = Date.now() - timestamp;
  const tenMin = 10 * 60 * 1000;

  if (diffMs >= tenMin) {
    console.log("Time finished");
    await downloadImage(imagePath, timestampPath);
  }
}
