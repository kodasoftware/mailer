import { route } from '@kodasoftware/koa-bundle'

const router = route('ping', 'get', '/', [
  (ctx) => {
    ctx.body = { pong: true }
  }
])

export default router
