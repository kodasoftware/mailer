import mailer from 'sendmail'
import config from '../config'
import logger from '../logger'

export default () => {
  return mailer({
    // logger: {
    //   debug: logger.debug,
    //   info: logger.info,
    //   warn: logger.warn,
    //   error: logger.error,
    // },
    ...config.mailer
  })
}
