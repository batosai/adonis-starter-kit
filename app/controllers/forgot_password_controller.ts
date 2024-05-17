import type { HttpContext } from '@adonisjs/core/http'
import mail from '@adonisjs/mail/services/main'
import { ForgotPasswordValidator } from '#validators/password_validator'
import User from '#models/user'
import ForgotPasswordNotification from '#mails/forgot_password_notification'

export default class ForgotPasswordController {
  public async create({ view }: HttpContext) {
    return view.render('pages/auth/forgot-password')
  }

  public async store({ request, response, session, i18n }: HttpContext) {
    const payload = await request.validateUsing(ForgotPasswordValidator)

    const user = await User.findBy('email', payload.email)

    if (user) {
      await mail.sendLater(new ForgotPasswordNotification(user))
    }

    session.flash('notification', {
      type: 'success',
      message: i18n.formatMessage('form.success.forgotPassword')
    })

    response.redirect('/auth/login')
  }
}
