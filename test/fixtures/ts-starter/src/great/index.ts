// import { cloudInit } from '~/common/init'
import { Application as App, Router } from 'simple-cloudbase-router'
// const cloud = cloudInit()
const app = new App()
const router = new Router({
  prefix: 'great'
})

router.use((ctx, next) => {
  ctx.body.gloabl = true
  next()
})

router.use('idea', (ctx, next) => {
  ctx.body.idea = true
  next()
})

export async function main (event, context) {
  // const wxContext = cloud.getWXContext()
  return await app.serve(event, context)
}
