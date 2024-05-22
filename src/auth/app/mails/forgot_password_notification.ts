import router from '@adonisjs/core/services/router'
import i18nManager from '@adonisjs/i18n/services/main'
import { BaseMail } from '@adonisjs/mail'
import User from '#core/models/user'
import env from '#start/env'

export default class ForgotPasswordNotification extends BaseMail {
  constructor(private user: User) {
    super()
  }

  prepare() {
    const i18n = i18nManager.locale(i18nManager.defaultLocale)
    const url = router
      .builder()
      .prefixUrl(env.get('URL'))
      .params({ email: this.user.email })
      .makeSigned('auth.password.reset.create', {
        expiresIn: '1h',
      })

    this.message
      .from(env.get('EMAIL_FROM'), 'Adonis')
      .to(this.user.email, this.user.fullname)
      .subject(i18n.formatMessage('email.forgotPassword.subject'))
      .htmlView('auth::emails/auth/forgot-password', {
        user: this.user,
        url,
      })
  }
}
