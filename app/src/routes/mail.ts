import { route, middleware } from '@kodasoftware/koa-bundle'
import schema from './body.schema.json'

const router = route('sendMail', 'post', '/pubsub', [
  middleware.requestValidationForSchema(schema),
  async (ctx) => {
    try {
      const { message } = ctx.request.body
      const data = JSON.parse(message.data.toString())
      ctx.app.emit('send', data)
      ctx.status = 201
    } catch (err) {
      ctx.log.error(err)
      ctx.status = 400
      ctx.body = 'Invalid data'
    }
  }
])
route('sendMail', 'post', '/', [
  middleware.requestValidationForSchema(schema),
  async (ctx) => {
    try {
      const body = ctx.request.body
      ctx.app.emit('send', body)
      ctx.status = 201
    } catch (err) {
      ctx.log.error(err)
      ctx.status = 400
      ctx.body = 'Invalid data'
    }
  }
], { router })

export default router
