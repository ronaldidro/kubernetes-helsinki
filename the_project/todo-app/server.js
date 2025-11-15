const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.get("/greeting", (req, res) => {
  res.send("Hello from todo-app!");
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

