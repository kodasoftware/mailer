import { app, middleware } from '@kodasoftware/koa-bundle'
import { mount } from '@kodasoftware/koa-bundle/mount'
import compose from 'koa-compose'
import Koa from 'koa'
import { Server } from 'http'
import config from './config'
import logger from './logger'
import createMailer from './lib/mailer'
import send from './handlers/send'

import ping from './routes/ping'
import mail from './routes/mail'

export default class App {
  public readonly koa?: Koa
  private server: Server
  constructor() {
    this.koa = app
    this.koa
      .use(mount('/ping', compose([ping.routes(), ping.allowedMethods()])))
      .use(middleware.composedMiddlewares(config.app.name, config.log.level))
      .use(mount('/', compose([mail.routes(), mail.allowedMethods()])))
  }
  async start(port?: string) {
    const transport = await createMailer()
    this.koa.on('send', send(transport))
    this.koa.context.mailer = transport
    this.server = this.koa.listen(port || config.app.port)
    logger.debug(config.app.name + ' service listening on port ' + port || config.app.port)
  }
  close() {
    this.server && this.server.close()
  }
}
