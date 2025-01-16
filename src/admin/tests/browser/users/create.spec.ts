import testUtils from '@adonisjs/core/services/test_utils'
import { faker } from '@faker-js/faker'
import { test } from '@japa/runner'
import {
  MAX_LENGTH,
  MIN_LENGTH,
} from '#admin/validators/user_validator'
import Roles from '#core/enums/roles'
import User from '#core/models/user'
import { UserFactory } from '#database/factories/user_factory'

test.group('Admin create user', (group) => {
  let user: User | null = null

  group.each.setup(() => testUtils.db().withGlobalTransaction())
  group.each.setup(async () => {
    user = await UserFactory.merge({
      password: 'secret',
      email: 'virk@adonisjs.com',
      role: Roles.ADMIN,
    }).create()
  })

  test('should create errors validation fields', async ({ browserContext, visit, route }) => {
    await browserContext.loginAs(user!)

    const page = await visit(route('admin.users.create'))

    await page.locator('input[name="lastname"]').fill('a')
    await page.locator('input[name="firstname"]').fill('a')
    await page.locator('input[name="email"]').fill('a')
    await page.locator('text=validate').click()

    await page.assertElementsCount(
      await page.getByText(`The lastname field must have at least ${MIN_LENGTH} characters`),
      1
    )
    await page.assertElementsCount(
      await page.getByText(`The firstname field must have at least ${MIN_LENGTH} characters`),
      1
    )
    await page.assertElementsCount(
      await page.getByText('The email field must be a valid email address'),
      1
    )

    await page.locator('input[name="lastname"]').fill(faker.lorem.words(51))
    await page.locator('input[name="firstname"]').fill(faker.lorem.words(51))
    await page.locator('input[name="email"]').fill('virk@adonisjs.com')
    await page.locator('text=validate').click()

    // await page.pause()

    await page.assertElementsCount(
      await page.getByText(`The lastname field must not be greater than ${MAX_LENGTH} characters`),
      1
    )
    await page.assertElementsCount(
      await page.getByText(`The firstname field must not be greater than ${MAX_LENGTH} characters`),
      1
    )
    await page.assertElementsCount(await page.getByText('The email has already been taken'), 1)
  })

  test('should create success', async ({ browserContext, visit, route, i18n }) => {
    await browserContext.loginAs(user!)

    const page = await visit(route('admin.users.index'))

    await page.assertElementsCount('tbody tr', 1)

    await page.goto(route('admin.users.create'))

    await page.locator('input[name="lastname"]').fill(faker.person.lastName())
    await page.locator('input[name="firstname"]').fill(faker.person.firstName())
    await page.locator('input[name="email"]').fill(faker.internet.email())
    await page.locator('text=validate').click()
    // await page.pause()

    await page.assertElementsCount('tbody tr', 2)
    await page.assertElementsCount(
      await page.getByText(i18n.formatMessage('form.success.user.create')),
      1
    )
  })
})
