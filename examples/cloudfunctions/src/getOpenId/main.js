const Koa = require('koa')
const app = new Koa()
const Router = require('@koa/router')
const router = new Router()

router.all('/', (ctx) => {
  ctx.body = 'hello world'
})
app.use(router.routes(), router.allowedMethods())

app.listen(8086)
