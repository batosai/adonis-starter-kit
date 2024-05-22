import testUtils from '@adonisjs/core/services/test_utils'
import mail from '@adonisjs/mail/services/main'
import { test } from '@japa/runner'
import ForgotPasswordNotification from '#auth/mails/forgot_password_notification'
import { UserFactory } from '#database/factories/user_factory'

test.group('Forgot password mailer', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  test('not exist email address', async ({ client, route }) => {
    const { mails } = mail.fake()

    await client
      .post(route('auth.password.store'))
      .fields({
        email: 'jeremy@adonis.com',
      })
      .redirects(0)
      .withCsrfToken()

    mails.assertNotSent(ForgotPasswordNotification)

    mail.restore()
  })

  test('exist email address', async ({ client, route, i18n }) => {
    const { mails } = mail.fake()
    const user = await UserFactory.create()

    await client
      .post(route('auth.password.store'))
      .fields({
        email: user.email,
      })
      .redirects(0)
      .withCsrfToken()

    mails.assertQueued(ForgotPasswordNotification, ({ message }) => {
      return message.hasSubject(i18n.formatMessage('email.forgotPassword.subject'))
    })

    mail.restore()
  })
})
