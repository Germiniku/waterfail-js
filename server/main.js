const Koa = require('koa');
const bodyparser = require('koa-bodyparser');
const Router = require('koa-router');
const serve = require('koa-static');
const data = require('./data');
const path = require('path');
const open = require('open');

const { page1, page2, page3 } = data;

const app = new Koa();

const home = serve(path.join(__dirname) + '/static/');
app.use(home);
const router = new Router();
app.use(bodyparser());
app.use(router.routes());
router.post('/getImages', async (ctx) => {
  console.log(ctx.request.body);
  const { pageNum } = ctx.request.body;
  let data = 'NO DATA';
  switch (pageNum) {
    case 0:
      data = page1;
      break;
    case 1:
      data = page2;
      break;
    case 2:
      data = page3;
      break;
  }
  ctx.body = {
    pageSize: 3,
    pageData: JSON.stringify(data),
  };
  return;
});

app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set(
    'Access-Control-Allow-Headers',
    'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild'
  );
  ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  if (ctx.method == 'OPTIONS') {
    ctx.body = 200;
  } else {
    await next();
  }
});

app.listen(3000, () => {
  console.log(`server is running on port 3000`);
  open('http://localhost:3000');
});
