import testUtils from '@adonisjs/core/services/test_utils'
import { faker } from '@faker-js/faker'
import { test } from '@japa/runner'
import Roles from '#core/enums/roles'
import User from '#core/models/user'
import { UserFactory } from '#database/factories/user_factory'

test.group('Admin edit user', (group) => {
  let user: User | null = null

  group.each.setup(() => testUtils.db().withGlobalTransaction())
  group.each.setup(async () => {
    user = await UserFactory.merge({
      role: Roles.ADMIN,
    }).create()
  })

  test('should edit success', async ({ browserContext, visit, route, i18n }) => {
    await browserContext.loginAs(user!)

    const page = await visit(route('admin.users.edit', user!))

    await page.locator('input[name="lastname"]').fill(faker.person.lastName())
    await page.locator('text=validate').click()

    await page.assertElementsCount(
      await page.getByText(i18n.formatMessage('form.success.user.edit')),
      1
    )
  })
})
