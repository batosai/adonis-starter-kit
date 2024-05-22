import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'
import { UserFactory } from '#database/factories/user_factory'

test.group('Reset password', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  test('invalid signature', async ({ client, route, i18n }) => {
    const response = await client
      .get(route('auth.password.reset.create', { email: 'virk@adonisjs.com' }))
      .withCsrfToken()

    response.assertTextIncludes(i18n.formatMessage('auth.session.invalidResetLink'))
  })

  test('empty fields', async ({ client, route }) => {
    const response = await client
      .post(route('auth.password.reset.store'))
      .fields({
        password: '',
        password_confirmation: '',
        email: '',
      })
      .redirects(0)
      .withCsrfToken()

    response.assertFlashMessage('errors', {
      email: ['The email field must be defined'],
      password: ['The password field must be defined'],
    })
  })

  test('invalid email', async ({ client, route }) => {
    const response = await client
      .post(route('auth.password.reset.store'))
      .fields({
        password: 'Wsdfs254@',
        password_confirmation: 'Wsdfs254@',
        email: 'adonis.com',
      })
      .redirects(0)
      .withCsrfToken()

    response.assertValidationErrors('email', ['The email field must be a valid email address'])
  })

  test('missing password', async ({ client, route }) => {
    const user = await UserFactory.create()
    const response = await client
      .post(route('auth.password.reset.store'))
      .fields({
        email: user.email,
      })
      .redirects(0)
      .withCsrfToken()

    response.assertValidationErrors('password', ['The password field must be defined'])
  })

  test('invalid min length password', async ({ client, route }) => {
    const user = await UserFactory.create()
    const response = await client
      .post(route('auth.password.reset.store'))
      .fields({
        password: 'a',
        password_confirmation: 'a',
        email: user.email,
      })
      .redirects(0)
      .withCsrfToken()

    response.assertValidationErrors('password', [
      'The password field must have at least 8 characters',
    ])
  })

  test('invalid max length password', async ({ client, route }) => {
    const password =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
    const user = await UserFactory.create()
    const response = await client
      .post(route('auth.password.reset.store'))
      .fields({
        password: password,
        password_confirmation: password,
        email: user.email,
      })
      .redirects(0)
      .withCsrfToken()

    response.assertValidationErrors('password', [
      'The password field must not be greater than 255 characters',
    ])
  })

  test('invalid one lower in password', async ({ client, route, i18n }) => {
    const user = await UserFactory.create()
    const response = await client
      .post(route('auth.password.reset.store'))
      .fields({
        password: 'ADONISJS',
        password_confirmation: 'ADONISJS',
        email: user.email,
      })
      .redirects(0)
      .withCsrfToken()

    response.assertValidationErrors('password', [
      i18n.formatMessage('validator.shared.messages.oneLowerCaseAtLeast', {
        field: 'password',
      }),
    ])
  })

  test('invalid one numeric in password', async ({ client, route, i18n }) => {
    const user = await UserFactory.create()
    const response = await client
      .post(route('auth.password.reset.store'))
      .fields({
        password: 'adonisjs',
        password_confirmation: 'adonisjs',
        email: user.email,
      })
      .redirects(0)
      .withCsrfToken()

    response.assertValidationErrors('password', [
      i18n.formatMessage('validator.shared.messages.oneNumericAtLeast', {
        field: 'password',
      }),
    ])
  })

  test('invalid one special character in password', async ({ client, route, i18n }) => {
    const user = await UserFactory.create()
    const response = await client
      .post(route('auth.password.reset.store'))
      .fields({
        password: 'Adonisjs1',
        password_confirmation: 'Adonisjs1',
        email: user.email,
      })
      .redirects(0)
      .withCsrfToken()

    response.assertValidationErrors('password', [
      i18n.formatMessage('validator.shared.messages.oneSpecialCharacterAtLeast', {
        field: 'password',
      }),
    ])
  })

  test('invalid one upper in password', async ({ client, route, i18n }) => {
    const user = await UserFactory.create()
    const response = await client
      .post(route('auth.password.reset.store'))
      .fields({
        password: 'adonisjs1',
        password_confirmation: 'adonisjs1',
        email: user.email,
      })
      .redirects(0)
      .withCsrfToken()

    response.assertValidationErrors('password', [
      i18n.formatMessage('validator.shared.messages.oneUpperCaseAtLeast', {
        field: 'password',
      }),
    ])
  })

  test('different password', async ({ client, route }) => {
    const user = await UserFactory.create()
    const response = await client
      .post(route('auth.password.reset.store'))
      .fields({
        password: 'Wsdfs254@',
        password_confirmation: 'f',
        email: user.email,
      })
      .redirects(0)
      .withCsrfToken()

    response.assertValidationErrors('password', [
      'The password field and password_confirmation field must be the same',
    ])
  })
})
