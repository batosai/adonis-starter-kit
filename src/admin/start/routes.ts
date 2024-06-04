import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const UsersController = () => import('#admin/controllers/users_controller')

router.group(() => {
  router.on('/').render('admin::pages/dashboard').as('dashboard')

  router.resource('users', UsersController).except(['show'])
  router.patch('users/:id/toggle-disabled', [UsersController, 'toggleDisabled']).as(
    'users.toggle.disabled'
  )
  router.post('users/:id/forgot-password', [UsersController, 'forgotPassword']).as(
    'users.forgot.password'
  )
})
  .prefix('admin')
  .as('admin')
  .use(middleware.auth())
  // .middleware(['auth', 'impersonate'])
