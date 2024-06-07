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

const SessionController = () => import('#auth/controllers/session_controller')
const ForgotPasswordController = () => import('#auth/controllers/forgot_password_controller')
const ResetPasswordController = () => import('#auth/controllers/reset_password_controller')
const ImpersonatesController = () => import('#auth/controllers/impersonates_controller')

router
  .group(() => {
    router.get('login', [SessionController, 'create']).as('session.create')
    router.post('login', [SessionController, 'store']).as('session.store')

    router.get('forgot-password', [ForgotPasswordController, 'create']).as('password.create')
    router.post('forgot-password', [ForgotPasswordController, 'store']).as('password.store')

    router
      .get('reset-password/:email', [ResetPasswordController, 'create'])
      .as('password.reset.create')
    router.post('reset-password', [ResetPasswordController, 'store']).as('password.reset.store')
  })
  .prefix('auth')
  .as('auth')
  .use(middleware.guest())

router
  .post('auth/logout', [SessionController, 'destroy'])
  .as('auth.session.destroy')
  .use(middleware.auth())

router
  .post('impersonates/:id', [ImpersonatesController, 'store'])
  .as('impersonate.store')
  .use(middleware.auth())
router
  .post('impersonates', [ImpersonatesController, 'destroy'])
  .as('impersonate.destroy')
  .use(middleware.auth())
