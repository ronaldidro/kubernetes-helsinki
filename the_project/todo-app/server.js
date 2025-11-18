import express from "express";
import path from "path";
import { createTodo, getTodos } from "./lib/client.js";
import { ensureImage } from "./lib/utils.js";

const app = express();
const port = process.env.PORT || 3000;
const folder = "/usr/src/app/files";
const imagePath = path.join(folder, "image.jpg");
const timestampPath = path.join(folder, "timestamp.txt");

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "views"));

app.get("/", async (req, res) => {
  await ensureImage(imagePath, timestampPath);

  let todos = [];
  try {
    todos = await getTodos();
  } catch (err) {
    console.error("Error fetching todos:", err);
  }

  res.render("index", { todos });
});

app.get("/image", (req, res) => {
  res.sendFile(imagePath);
});

app.post("/todos", async (req, res) => {
  const description = req.body.description?.trim();

  if (description) {
    try {
      await createTodo(description);
    } catch (err) {
      console.error("Error creating todo:", err);
    }
  }

  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
