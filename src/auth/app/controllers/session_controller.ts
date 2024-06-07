import { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'
import User from '#core/models/user'

export default class SessionController {
  async create({ request, view }: HttpContext) {
    return view.render('auth::pages/login', {
      redirectTo: request.input('redirect_to', '/admin'),
    })
  }

  async store({ request, auth, session, i18n, response }: HttpContext) {
    const { email, password, redirectTo } = request.only(['email', 'password', 'redirectTo'])

    const user = await User.verifyCredentials(email, password)

    await auth.use('web').login(user, !!request.input('remember_me'))

    if (user?.disabled) {
      session.flash('notification', {
        type: 'error',
        message: i18n.formatMessage('errors.E_INVALID_DISABLED'),
      })
      session.clear()
      return response.redirect('/auth/login')
    }

    user.lastLoginAt = DateTime.local()
    await user.save()

    session.flash('notification', {
      type: 'success',
      message: i18n.formatMessage('form.success.session'),
    })

    if (redirectTo) {
      response.redirect().toPath(redirectTo)
    } else {
      response.redirect('/')
    }
  }

  async destroy({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    response.redirect('/auth/login')
  }
}
