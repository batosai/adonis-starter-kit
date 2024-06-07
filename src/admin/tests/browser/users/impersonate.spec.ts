import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'
import Roles from '#core/enums/roles'
import User from '#core/models/user'
import { UserFactory } from '#database/factories/user_factory'

test.group('Admin impersonate user', (group) => {
  let user: User | null = null

  group.each.setup(() => testUtils.db().withGlobalTransaction())
  group.each.setup(async () => {
    user = await UserFactory.merge({
      role: Roles.ADMIN,
    }).create()
  })

  test('should impersonate success', async ({ browserContext, visit, route }) => {
    const customer = await UserFactory.create()

    await browserContext.loginAs(user!)

    const page = await visit(route('admin.users.edit', customer))

    await page.getByRole('button', { name: 'Yes, impersonate' }).click()
    await page.locator('.modal').getByRole('button', { name: 'ok' }).click()

    await page.assertTextContains('body', customer.fullname)

    await page.locator('form').getByRole('button').click()

    await page.assertTextContains('body', user!.fullname)
  })
})
