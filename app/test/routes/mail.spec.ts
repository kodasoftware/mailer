import App from '../../src/app'
import 'should'
import request from 'request-promise'
import Chance from 'chance'
import * as td from 'testdouble'

const PORT = '3000'
const URL = 'http://localhost:' + PORT
const APP = new App()
const CHANCE = new Chance()

describe('Mail', () => {
  const transport = td.object(['sendMail'])
  before(async () => {
    await APP.start(PORT, transport)
  })
  afterEach(() => td.reset())
  after(() => APP.close())

  describe('Given a request is recieved to send a mail', () => {
    const from = CHANCE.email()
    const to = CHANCE.email()
    const subject = CHANCE.sentence()
    const text = CHANCE.paragraph()
    const html = CHANCE.paragraph()
    const body = { message: { data: {}, messageId: CHANCE.string(), attributes: {} }, subscription: CHANCE.string() }

    describe('When that request is missing any required params', () => {
      it('should throw 400 error if no body', async () => {
        await request(URL, {
          method: 'post',
          body: {},
          json: true,
        }).catch((res) => {
          res.statusCode.should.be.eql(400)
        })
      })
      it('should throw 400 error if missing text and html', async () => {
        body.message.data = JSON.stringify({ from, to })
        await request(URL, {
          method: 'post',
          body,
          json: true,
        }).catch((res) => {
          res.statusCode.should.be.eql(400)
        })
      })
      it('should throw 400 error if missing to', async () => {
        body.message.data = JSON.stringify({ from, text, html })
        await request(URL, {
          method: 'post',
          body,
          json: true,
        }).catch((res) => {
          res.statusCode.should.be.eql(400)
        })
      })
      it('should throw 400 error if missing from', async () => {
        body.message.data = JSON.stringify({ to, text, html })
        await request(URL, {
          method: 'post',
          body,
          json: true,
        }).catch((res) => {
          res.statusCode.should.be.eql(400)
        })
      })
    })

    describe('When that request contains a valid body', () => {
      it('should send mail with send handler', async () => {
        body.message.data = JSON.stringify({ from, to, subject, text, html })
        await request(URL, {
          method: 'post',
          body,
          json: true,
          resolveWithFullResponse: true,
        }).then((res) => {
          res.statusCode.should.be.eql(201)
        })
        td.verify(transport.sendMail(td.matchers.contains(JSON.parse(body.message.data as any))))
      })
      it('should send mail with send handler', async () => {
        body.message.data = JSON.stringify({ from, to, text, html })
        await request(URL, {
          method: 'post',
          body,
          json: true,
          resolveWithFullResponse: true,
        }).then((res) => {
          res.statusCode.should.be.eql(201)
        })
        td.verify(transport.sendMail(td.matchers.contains(JSON.parse(body.message.data as any))))
      })
      it('should send mail with send handler', async () => {
        body.message.data = JSON.stringify({ from, to, html })
        await request(URL, {
          method: 'post',
          body,
          json: true,
          resolveWithFullResponse: true,
        }).then((res) => {
          res.statusCode.should.be.eql(201)
        })
        td.verify(transport.sendMail(td.matchers.contains(JSON.parse(body.message.data as any))))
      })
      it('should send mail with send handler', async () => {
        body.message.data = JSON.stringify({ from, to, text })
        await request(URL, {
          method: 'post',
          body,
          json: true,
          resolveWithFullResponse: true,
        }).then((res) => {
          res.statusCode.should.be.eql(201)
        })
        td.verify(transport.sendMail(td.matchers.contains(JSON.parse(body.message.data as any))))
      })
    })
  })
})
