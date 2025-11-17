import Koa from 'koa';
import Router from 'koa-router';

const app = new Koa();
const router = new Router();
const PORT = process.env.PORT || 3000;

let counter = 0;

router.get('/pingpong', (ctx) => {
  counter += 1;
  ctx.body = `pong ${counter}`;
});

router.get('/pings', (ctx) => {
  ctx.body = { counter };
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(PORT, () => {
  console.log(`Ping-pong app listening on port ${PORT}`);
});
