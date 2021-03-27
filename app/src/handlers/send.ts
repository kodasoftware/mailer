import mailer from '../lib/mailer'
import logger from '../logger'

export default (transport?: any) => async function send(data) {
  const _transport = transport || mailer()
  try {
    const info = await _transport(data)
    logger.debug(info)
  } catch (err) {
    logger.error(err)
  }
}
