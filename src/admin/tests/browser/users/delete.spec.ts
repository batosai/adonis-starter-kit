import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'
import Roles from '#core/enums/roles'
import User from '#core/models/user'
import { UserFactory } from '#database/factories/user_factory'

test.group('Admin delete user', (group) => {
  let user: User | null = null

  group.each.setup(() => testUtils.db().withGlobalTransaction())
  group.each.setup(async () => {
    user = await UserFactory.merge({
      role: Roles.ADMIN,
    }).create()
  })

  test('should delete success', async ({ browserContext, visit, route, i18n }) => {
    const customer = await UserFactory.create()

    await browserContext.loginAs(user!)

    const page = await visit(route('admin.users.index'))

    await page.assertElementsCount('tbody tr', 2)

    await page.goto(route('admin.users.edit', customer))

    await page.getByRole('button', { name: 'Yes, delete' }).click()
    await page.locator('.modal').getByRole('button', { name: 'ok' }).click()

    await page.assertElementsCount(
      await page.getByText(i18n.formatMessage('form.success.user.delete')),
      1
    )

    await page.assertElementsCount('tbody tr', 1)
  })
})
