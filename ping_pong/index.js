import Koa from 'koa';
import Router from 'koa-router';
import fs from 'node:fs';

const app = new Koa();
const router = new Router();
const PORT = process.env.PORT || 3000;

const file = '/usr/src/app/data/log.txt';
let counter = 0;

router.get('/pingpong', (ctx) => {
  counter += 1;
  fs.appendFileSync(file, `Ping / Pongs: ${counter}\n`);
  ctx.body = `pong ${counter}`;
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(PORT, () => {
  console.log(`Ping-pong app listening on port ${PORT}`);
});
