import factory from '@adonisjs/lucid/factories'
import User from '#core/models/user'

export const UserFactory = factory
  .define(User, async ({ faker }) => {
    return {
      lastname: faker.person.lastName(),
      firstname: faker.person.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      disabled: false,
      // avatar
    }
  })
  .state('disabled', (user) => (user.disabled = true))
  .build()
