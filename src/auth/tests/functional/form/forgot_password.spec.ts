import { test } from '@japa/runner'

test.group('Forgot password', () => {
  test('empty email', async ({ client, route }) => {
    const response = await client
      .post(route('auth.password.store'))
      .fields({
        email: '',
      })
      .redirects(0)
      .withCsrfToken()

    response.assertValidationErrors('email', ['The email field must be defined'])
  })

  test('invalid email', async ({ client, route }) => {
    const response = await client
      .post(route('auth.password.store'))
      .fields({
        email: 'no valid email',
      })
      .redirects(0)
      .withCsrfToken()

    response.assertValidationErrors('email', ['The email field must be a valid email address'])
  })

  test('valid email', async ({ client, route, i18n }) => {
    const response = await client
      .post(route('auth.password.store'))
      .fields({
        email: 'jeremy@adonis.com',
      })
      .redirects(0)
      .withCsrfToken()

    response.assertFlashMessage('notification', {
      type: 'success',
      message: i18n.formatMessage('form.success.forgotPassword'),
    })
  })
})
