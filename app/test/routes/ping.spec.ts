import App from '../../src/app'
import 'should'
import request from 'request-promise'

const APP = new App()
const PORT = '3000'
const URL = 'http://localhost:' + PORT

describe('Ping', () => {
  before(() => APP.start(PORT))
  after(() => APP.close())

  describe('Given a user or system wishes to check health of API', () => {
    describe('When a request is received to ping API', () => {
      it('should respond with 200 and response body', async () => {
        await request(URL + '/ping', {
          method: 'get',
          json: true,
          resolveWithFullResponse: true,
        }).then((res) => {
          res.statusCode.should.be.eql(200)
          res.body.should.be.eql({ pong: true })
        })
      })
    })
  })
})
