import testUtils from '@adonisjs/core/services/test_utils'
import mail from '@adonisjs/mail/services/main'
import { test } from '@japa/runner'
import ForgotPasswordNotification from '#auth/mails/forgot_password_notification'
import Roles from '#core/enums/roles'
import { UserFactory } from '#database/factories/user_factory'

test.group(' Admin Forgot password mailer', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  test('send reset password instructions', async ({ client, route, i18n }) => {
    const user = await UserFactory.merge({
      role: Roles.ADMIN,
    }).create()
    const { mails } = mail.fake()
    const customer = await UserFactory.create()

    await client
      .post(route('admin.users.forgot.password', customer))
      .redirects(0)
      .withCsrfToken()
      .loginAs(user)

    mails.assertQueued(ForgotPasswordNotification, ({ message }) => {
      return message.hasSubject(i18n.formatMessage('email.forgotPassword.subject'))
    })

    mail.restore()
  })
})
