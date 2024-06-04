import type { HttpContext } from '@adonisjs/core/http'
import { ResetPasswordValidator } from '#auth/validators/password_validator'
import User from '#core/models/user'

export default class ResetPasswordController {
  async create({ request, view, params }: HttpContext) {
    const isSignatureValid = request.hasValidSignature()
    const email = params.email

    return view.render('auth::pages/reset-password', { isSignatureValid, email })
  }

  async store({ request, response, auth, session, i18n }: HttpContext) {
    const { email, password } = await request.validateUsing(ResetPasswordValidator)

    const user = await User.findByOrFail('email', email)
    user.password = password
    await user.save()

    await auth.use('web').login(user)

    session.flash('notification', {
      type: 'success',
      message: i18n.formatMessage('form.success.resetPassword'),
    })

    response.redirect('/')
  }
}
