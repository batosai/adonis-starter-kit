// https://docs.adonisjs.com/guides/references/events

import emitter from '@adonisjs/core/services/emitter'
import app from '@adonisjs/core/services/app'
import logger from '@adonisjs/core/services/logger'
import db from '@adonisjs/lucid/services/db'
import string from '@adonisjs/core/helpers/string'

emitter.on('db:query', function (query) {
  if (app.inProduction) {
    logger.debug(query.sql)
  } else {
    db.prettyPrint(query)
  }
})

if (app.inDev) {
  emitter.on('http:request_completed', (event) => {
    const method = event.ctx.request.method()
    const url = event.ctx.request.url(true)
    const duration = event.duration

    logger.info(`${method} ${url}: ${string.prettyHrTime(duration)}`)
  })

  emitter.on('i18n:missing:translation', function (event) {
    logger.warn(`Translation missing: ${event.locale}, ${event.identifier}`)
  })

  emitter.on('mail:sending', (event) => {
    logger.info(`Mail ${event.mailerName} is sending: ${event.message.subject}`)
  })
}
