import testUtils from '@adonisjs/core/services/test_utils'
import { faker } from '@faker-js/faker'
import { test } from '@japa/runner'
import {
  MAX_LENGTH,
  MIN_LENGTH,
} from '#admin/validators/user_validator'
import Roles from '#core/enums/roles'
// import Drive from '@ioc:Adonis/Core/Drive'
// import { file } from '@ioc:Adonis/Core/Helpers'
import { UserFactory } from '#database/factories/user_factory'

test.group('User validator', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  test('invalid required', async ({ client, route }) => {
    const user = await UserFactory.merge({
      role: Roles.ADMIN,
    }).create()

    const response = await client
      .post(route('admin.users.store'))
      .redirects(0)
      .withCsrfToken()
      .loginAs(user)

    // console.log(response.flashMessages())

    response.assertFlashMessage('errors', {
      firstname: ['The firstname field must be defined'],
      lastname: ['The lastname field must be defined'],
      email: ['The email field must be defined'],
    })
  })

  test('invalid min lenght lastname and firstname', async ({ client, route }) => {
    const user = await UserFactory.merge({
      role: Roles.ADMIN,
    }).create()

    const response = await client
      .post(route('admin.users.store'))
      .fields({
        lastname: 'a',
        firstname: 'b',
        email: faker.internet.email(),
        role: Roles.USER,
      })
      .redirects(0)
      .withCsrfToken()
      .loginAs(user)

    response.assertFlashMessage('errors', {
      firstname: [`The firstname field must have at least ${MIN_LENGTH} characters`],
      lastname: [`The lastname field must have at least ${MIN_LENGTH} characters`],
    })
  })

  test('invalid max lenght lastname and firstname', async ({ client, route }) => {
    const user = await UserFactory.merge({
      role: Roles.ADMIN,
    }).create()

    const response = await client
      .post(route('admin.users.store'))
      .fields({
        lastname: faker.lorem.words(51),
        firstname: faker.lorem.words(51),
        email: faker.internet.email(),
        role: Roles.USER,
      })
      .redirects(0)
      .withCsrfToken()
      .loginAs(user)

    response.assertFlashMessage('errors', {
      firstname: [`The firstname field must not be greater than ${MAX_LENGTH} characters`],
      lastname: [`The lastname field must not be greater than ${MAX_LENGTH} characters`],
    })
  })

  test('invalid format email', async ({ client, route }) => {
    const user = await UserFactory.merge({
      role: Roles.ADMIN,
    }).create()

    const response = await client
      .post(route('admin.users.store'))
      .fields({
        lastname: faker.person.lastName(),
        firstname: faker.person.firstName(),
        email: 'jeremadonis.com',
        role: Roles.USER,
      })
      .redirects(0)
      .withCsrfToken()
      .loginAs(user)

    response.assertFlashMessage('errors', {
      email: ['The email field must be a valid email address'],
    })
  })

  test('invalid unique email', async ({ client, route }) => {
    const user = await UserFactory.merge({
      password: 'secret',
      email: 'virk@adonisjs.com',
      role: Roles.ADMIN,
    }).create()

    const response = await client
      .post(route('admin.users.store'))
      .fields({
        lastname: faker.person.lastName(),
        firstname: faker.person.firstName(),
        email: user.email,
        role: Roles.USER,
      })
      .redirects(0)
      .withCsrfToken()
      .loginAs(user)

    response.assertFlashMessage('errors', {
      email: ['The email has already been taken'],
    })
  })

  test('invalid min length password', async ({ client, route }) => {
    const user = await UserFactory.merge({
      role: Roles.ADMIN,
    }).create()
    const response = await client
      .post(route('admin.users.store'))
      .fields({
        password: 'a',
        password_confirmation: 'a',
        lastname: faker.person.lastName(),
        firstname: faker.person.firstName(),
        email: faker.internet.email(),
        role: Roles.USER,
      })
      .redirects(0)
      .withCsrfToken()
      .loginAs(user)

    response.assertValidationErrors('password', [
      'The password field must have at least 8 characters',
    ])
  })

  test('invalid max length password', async ({ client, route }) => {
    const password =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
    const user = await UserFactory.merge({
      role: Roles.ADMIN,
    }).create()
    const response = await client
      .post(route('admin.users.store'))
      .fields({
        password: password,
        password_confirmation: password,
        lastname: faker.person.lastName(),
        firstname: faker.person.firstName(),
        email: faker.internet.email(),
        role: Roles.USER,
      })
      .redirects(0)
      .withCsrfToken()
      .loginAs(user)

    response.assertValidationErrors('password', [
      'The password field must not be greater than 255 characters',
    ])
  })

  test('invalid one lower in password', async ({ client, route, i18n }) => {
    const user = await UserFactory.merge({
      role: Roles.ADMIN,
    }).create()
    const response = await client
      .post(route('admin.users.store'))
      .fields({
        password: 'ADONISJS',
        password_confirmation: 'ADONISJS',
        lastname: faker.person.lastName(),
        firstname: faker.person.firstName(),
        email: faker.internet.email(),
        role: Roles.USER,
      })
      .redirects(0)
      .withCsrfToken()
      .loginAs(user)

    response.assertValidationErrors('password', [
      i18n.formatMessage('validator.shared.messages.oneLowerCaseAtLeast', {
        field: 'password',
      }),
    ])
  })

  test('invalid one numeric in password', async ({ client, route, i18n }) => {
    const user = await UserFactory.merge({
      role: Roles.ADMIN,
    }).create()
    const response = await client
      .post(route('admin.users.store'))
      .fields({
        password: 'adonisjs',
        password_confirmation: 'adonisjs',
        lastname: faker.person.lastName(),
        firstname: faker.person.firstName(),
        email: faker.internet.email(),
        role: Roles.USER,
      })
      .redirects(0)
      .withCsrfToken()
      .loginAs(user)

    response.assertValidationErrors('password', [
      i18n.formatMessage('validator.shared.messages.oneNumericAtLeast', {
        field: 'password',
      }),
    ])
  })

  test('invalid one special character in password', async ({ client, route, i18n }) => {
    const user = await UserFactory.merge({
      role: Roles.ADMIN,
    }).create()
    const response = await client
      .post(route('admin.users.store'))
      .fields({
        password: 'Adonisjs1',
        password_confirmation: 'Adonisjs1',
        lastname: faker.person.lastName(),
        firstname: faker.person.firstName(),
        email: faker.internet.email(),
        role: Roles.USER,
      })
      .redirects(0)
      .withCsrfToken()
      .loginAs(user)

    response.assertValidationErrors('password', [
      i18n.formatMessage('validator.shared.messages.oneSpecialCharacterAtLeast', {
        field: 'password',
      }),
    ])
  })

  test('invalid one upper in password', async ({ client, route, i18n }) => {
    const user = await UserFactory.merge({
      role: Roles.ADMIN,
    }).create()
    const response = await client
      .post(route('admin.users.store'))
      .fields({
        password: 'adonisjs1',
        password_confirmation: 'adonisjs1',
        lastname: faker.person.lastName(),
        firstname: faker.person.firstName(),
        email: faker.internet.email(),
        role: Roles.USER,
      })
      .redirects(0)
      .withCsrfToken()
      .loginAs(user)

    response.assertValidationErrors('password', [
      i18n.formatMessage('validator.shared.messages.oneUpperCaseAtLeast', {
        field: 'password',
      }),
    ])
  })

  // test('invalid size avatar', async ({ client, route, i18n }) => {
  //   Drive.fake()

  //   const user = await UserFactory.merge({
  //     role: Roles.ADMIN,
  //   }).create()

  //   const fakeAvatar = await file.generatePng('20mb')

  //   const response = await client
  //     .put(route('admin.users.update', user))
  //     .fields({
  //       lastname: faker.person.lastName(),
  //       firstname: faker.person.firstName(),
  //       email: faker.internet.email(),
  //     })
  //     .file('avatar', fakeAvatar.contents, { filename: fakeAvatar.name })
  //     .redirects(0)
  //     .withCsrfToken()
  //     .loginAs(user)

  //   response.assertFlashMessage('errors', {
  //     avatar: [
  //       i18n.formatMessage('validator.shared.avatar.maxSize', {
  //         max_size: MAX_SIZE,
  //       }),
  //     ],
  //   })

  //   Drive.restore()
  // })

  // test('invalid format avatar', async ({ client, route, i18n }) => {
  //   Drive.fake()

  //   const user = await UserFactory.merge({
  //     role: Roles.ADMIN,
  //   }).create()

  //   const fakeAvatar = await file.generatePdf('1mb')

  //   const response = await client
  //     .put(route('admin.users.update', user))
  //     .fields({
  //       lastname: faker.person.lastName(),
  //       firstname: faker.person.firstName(),
  //       email: faker.internet.email(),
  //     })
  //     .file('avatar', fakeAvatar.contents, { filename: fakeAvatar.name })
  //     .redirects(0)
  //     .withCsrfToken()
  //     .loginAs(user)

  //   response.assertFlashMessage('errors', {
  //     avatar: [i18n.formatMessage('validator.shared.avatar.extname')],
  //   })

  //   Drive.restore()
  // })

  test('authorize disabled user', async ({ client, route }) => {
    const user = await UserFactory.merge({
      role: Roles.ADMIN,
    }).create()
    const customer = await UserFactory.create()

    const response = await client
      .patch(route('admin.users.toggle.disabled', customer))
      .redirects(0)
      .withCsrfToken()
      .loginAs(user)

    response.assertFlashMessage('notification', {
      type: 'success',
      message: 'Felicitations, the user is now disabled.',
    })
  })

  test('unauthorize disabled user', async ({ client, route }) => {
    const user = await UserFactory.merge({
      role: Roles.ADMIN,
    }).create()

    const response = await client
      .patch(route('admin.users.toggle.disabled', user))
      .redirects(0)
      .withCsrfToken()
      .loginAs(user)

    response.assertStatus(403)
  })

  test('authorize change role user', async ({ client, route }) => {
    const user = await UserFactory.merge({
      role: Roles.ADMIN,
    }).create()
    const customer = await UserFactory.create()

    const response = await client
      .put(route('admin.users.update', customer))
      .fields({
        firstname: customer.firstname,
        lastname: customer.lastname,
        email: customer.email,
        role: Roles.ADMIN,
      })
      .redirects(0)
      .withCsrfToken()
      .loginAs(user)

    response.assertFlashMessage('notification', {
      type: 'success',
      message: 'Felicitations, the user is now modify.',
    })
  })

  test('unauthorize change role user', async ({ client, route, assert }) => {
    const user = await UserFactory.merge({
      role: Roles.ADMIN,
    }).create()

    await client
      .put(route('admin.users.update', user))
      .fields({
        role: Roles.USER,
      })
      .redirects(0)
      .withCsrfToken()
      .loginAs(user)

    assert.equal(user.role, Roles.ADMIN)
  })
})
