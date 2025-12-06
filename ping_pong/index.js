import Koa from "koa";
import Router from "koa-router";
import { Pool } from "pg";

const app = new Koa();
const router = new Router();
const PORT = process.env.PORT || 3000;

const pool = new Pool({
  host: process.env.PG_HOST,
  port: 5432,
  user: "postgres",
  password: "postgres",
  database: "postgres",
});

let dbReady = false;

async function checkConnection() {
  await pool.query("SELECT 1;");
}

async function initDB() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS pings (
      id SERIAL PRIMARY KEY,
      value INT NOT NULL
    );
  `);

  const res = await pool.query("SELECT * FROM pings LIMIT 1");

  if (res.rows.length === 0) {
    await pool.query("INSERT INTO pings (value) VALUES (0)");
  }
}

function verifyDBReady(ctx, next) {
  if (!dbReady) {
    ctx.status = 503;
    ctx.body = {
      error: "Database not ready",
    };
    return;
  }
  return next();
}

(async () => {
  try {
    await initDB();
    dbReady = true;
    console.log("Database initialized.");
  } catch (err) {
    dbReady = false;
    console.log("DB not ready yet.");
  }
})();

router.get("/healthz", async (ctx) => {
  try {
    await checkConnection();
    dbReady = true;
    ctx.status = 200;
  } catch {
    dbReady = false;
    ctx.status = 500;
  }
});

router.get("/", (ctx) => {
  ctx.body = "ok";
});

router.get("/pingpong", verifyDBReady, async (ctx) => {
  const res = await pool.query(
    "UPDATE pings SET value = value + 1 WHERE id = 1 RETURNING value"
  );
  ctx.body = `pong ${res.rows[0].value}`;
});

router.get("/pings", verifyDBReady, async (ctx) => {
  const res = await pool.query("SELECT value FROM pings WHERE id = 1");
  ctx.body = { counter: res.rows[0].value };
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(PORT, () => {
  console.log(`Ping-pong app listening on port ${PORT}`);
});
