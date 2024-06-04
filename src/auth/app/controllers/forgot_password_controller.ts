import type { HttpContext } from '@adonisjs/core/http'
import mail from '@adonisjs/mail/services/main'
import ForgotPasswordNotification from '#auth/mails/forgot_password_notification'
import { ForgotPasswordValidator } from '#auth/validators/password_validator'
import User from '#core/models/user'

export default class ForgotPasswordController {
  async create({ view }: HttpContext) {
    return view.render('auth::pages/forgot-password')
  }

  async store({ request, response, session, i18n }: HttpContext) {
    const payload = await request.validateUsing(ForgotPasswordValidator)

    const user = await User.findBy('email', payload.email)

    if (user) {
      await mail.sendLater(new ForgotPasswordNotification(user))
    }

    session.flash('notification', {
      type: 'success',
      message: i18n.formatMessage('form.success.forgotPassword'),
    })

    response.redirect('/auth/login')
  }
}
