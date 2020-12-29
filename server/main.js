const Koa = require('koa')
const bodyparser = require('koa-bodyparser')

const app = new Koa()
app.use(bodyparser())
const page1 = [
  { img: 'images/1.jpg', width: 500, height: 658 },
  { img: 'images/10.jpg', width: 500, height: 417 },
  { img: 'images/11.jpg', width: 500, height: 500 },
  { img: 'images/12.jpg', width: 500, height: 333 },
  { img: 'images/13.jpg', width: 500, height: 662 },
  { img: 'images/14.jpg', width: 400, height: 400 },
  { img: 'images/15.jpg', width: 500, height: 707 },
  { img: 'images/16.jpg', width: 500, height: 708 },
  { img: 'images/17.jpg', width: 500, height: 333 },
  { img: 'images/12.jpg', width: 500, height: 333 },
  { img: 'images/13.jpg', width: 500, height: 662 },
  { img: 'images/14.jpg', width: 400, height: 400 },
  { img: 'images/15.jpg', width: 500, height: 707 },
  { img: 'images/16.jpg', width: 500, height: 708 },
  { img: 'images/17.jpg', width: 500, height: 333 },
  { img: 'images/18.jpg', width: 500, height: 371 },
  { img: 'images/19.jpg', width: 533, height: 300 },
  { img: 'images/2.jpg', width: 500, height: 707 },
  { img: 'images/20.jpg', width: 224, height: 317 },
  { img: 'images/21.jpg', width: 500, height: 707 },
  { img: 'images/22.jpg', width: 236, height: 332 },
  { img: 'images/23.jpg', width: 500, height: 312 },
  { img: 'images/24.jpg', width: 500, height: 500 },
  { img: 'images/10.jpg', width: 500, height: 417 },
  { img: 'images/11.jpg', width: 500, height: 500 },
  { img: 'images/12.jpg', width: 500, height: 333 },
  { img: 'images/13.jpg', width: 500, height: 662 },
  { img: 'images/14.jpg', width: 400, height: 400 },
  { img: 'images/15.jpg', width: 500, height: 707 },
  { img: 'images/16.jpg', width: 500, height: 708 },
  { img: 'images/17.jpg', width: 500, height: 333 },
]

const page2 = [
  { img: 'images/1.jpg', width: 500, height: 658 },
  { img: 'images/10.jpg', width: 500, height: 417 },
  { img: 'images/11.jpg', width: 500, height: 500 },
  { img: 'images/12.jpg', width: 500, height: 333 },
  { img: 'images/13.jpg', width: 500, height: 662 },
  { img: 'images/14.jpg', width: 400, height: 400 },
  { img: 'images/15.jpg', width: 500, height: 707 },
  { img: 'images/16.jpg', width: 500, height: 708 },
  { img: 'images/17.jpg', width: 500, height: 333 },
  { img: 'images/18.jpg', width: 500, height: 371 },
  { img: 'images/19.jpg', width: 533, height: 300 },
  { img: 'images/2.jpg', width: 500, height: 707 },
  { img: 'images/20.jpg', width: 224, height: 317 },
  { img: 'images/21.jpg', width: 500, height: 707 },
  { img: 'images/22.jpg', width: 236, height: 332 },
  { img: 'images/23.jpg', width: 500, height: 312 },
  { img: 'images/24.jpg', width: 500, height: 500 },
  { img: 'images/25.jpg', width: 500, height: 722 },
  { img: 'images/26.jpg', width: 500, height: 749 },
]
const page3 = [
  { img: 'images/1.jpg', width: 500, height: 658 },
  { img: 'images/10.jpg', width: 500, height: 417 },
  { img: 'images/11.jpg', width: 500, height: 500 },
  { img: 'images/12.jpg', width: 500, height: 333 },
  { img: 'images/13.jpg', width: 500, height: 662 },
  { img: 'images/14.jpg', width: 400, height: 400 },
  { img: 'images/15.jpg', width: 500, height: 707 },
  { img: 'images/16.jpg', width: 500, height: 708 },
  { img: 'images/17.jpg', width: 500, height: 333 },
  { img: 'images/18.jpg', width: 500, height: 371 },
  { img: 'images/19.jpg', width: 533, height: 300 },
  { img: 'images/2.jpg', width: 500, height: 707 },
  { img: 'images/20.jpg', width: 224, height: 317 },
  { img: 'images/21.jpg', width: 500, height: 707 },
  { img: 'images/22.jpg', width: 236, height: 332 },
  { img: 'images/23.jpg', width: 500, height: 312 },
  { img: 'images/24.jpg', width: 500, height: 500 },
  { img: 'images/25.jpg', width: 500, height: 722 },
  { img: 'images/26.jpg', width: 500, height: 749 },
]
app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*')
  ctx.set(
    'Access-Control-Allow-Headers',
    'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild'
  )
  ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
  if (ctx.method == 'OPTIONS') {
    ctx.body = 200
  } else {
    await next()
  }
})

// app.use(async ctx => {
//   ctx.body = 'Hello World';
// });

app.use(async (ctx) => {
  console.log(ctx.request.body)
  const { pageNum } = ctx.request.body
  let data = 'NO DATA'
  switch (pageNum) {
    case 0:
      data = page1
      break
    case 1:
      data = page2
      break
    case 2:
      data = page3
      break
  }
  ctx.body = {
    pageSize: 3,
    pageData: JSON.stringify(data),
  }
  return
})

app.listen(3000, () => {
  console.log(`server is running on port 3000`)
})
