import express from "express";
import path from "path";
import { createTodo, getTodos, updateTodo } from "./lib/client.js";
import { ensureImage } from "./lib/utils.js";

const app = express();
const port = process.env.APP_PORT;
const folder = "/usr/src/app/files";
const imagePath = path.join(folder, "image.jpg");
const timestampPath = path.join(folder, "timestamp.txt");

app.use(express.urlencoded({ extended: true }));

app.use((req, _, next) => {
  if (req.body && req.body._method) {
    req.method = req.body._method.toUpperCase();
  }
  next();
});

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

  const pending = todos.filter((t) => !t.done);
  const done = todos.filter((t) => t.done);

  res.render("index", { pending, done });
});

app.get("/healthz", async (_, res) => {
  try {
    await getTodos();
    res.status(200).send({ status: "ok" });
  } catch (err) {
    console.error("Health check failed:", err.message);
    res.status(503).send({ status: "db unavailable" });
  }
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

app.patch("/todos/:id", async (req, res) => {
  try {
    await updateTodo(req.params.id);
  } catch (err) {
    console.error("Error updating todo:", err);
  }

  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
