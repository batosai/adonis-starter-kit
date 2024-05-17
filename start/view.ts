import env from '#start/env'
import app from '@adonisjs/core/services/app'
import edge from 'edge.js'

edge.global('app', {
  inDev: app.inDev,
  env: env.get('NODE_ENV')
})

edge.global('env', env)
