/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const SessionController = () => import('#controllers/session_controller')


router.on('/').render('pages/home')

router.group(() => {
  router.get('login', [SessionController, 'create']).as('session.create')
  router.post('login', [SessionController, 'store']).as('session.store')
})
  .prefix('auth')
  .as('auth')
  .use(middleware.guest())

  router.post('auth/logout', [SessionController, 'destroy'])
  .as('auth.session.destroy')
  .use(middleware.auth())
