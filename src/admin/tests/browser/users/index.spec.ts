import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'
import Roles from '#core/enums/roles'
import User from '#core/models/user'
import { UserFactory } from '#database/factories/user_factory'

test.group('Admin users', (group) => {
  let user: User | null = null

  group.each.setup(() => testUtils.db().withGlobalTransaction())
  group.each.setup(async () => {
    user = await UserFactory.merge({
      password: 'secret',
      email: 'virk@adonisjs.com',
      role: Roles.ADMIN,
    }).create()
  })

  test('should access users list', async ({ browserContext, visit, route }) => {
    await UserFactory.createMany(12)

    await browserContext.loginAs(user!)

    const page = await visit(route('admin.users.index'))
    // await page.pause()

    await page.assertElementsCount('tbody tr', 10)

    await page.goto(
      route(
        'admin.users.index',
        {},
        {
          qs: {
            page: 2,
          },
        }
      ),
      {
        waitUntil: 'load',
      }
    )

    await page.assertElementsCount('tbody tr', 3)
  })

  test('should find specific user', async ({ browserContext, visit, route }) => {
    await UserFactory.createMany(12)

    await browserContext.loginAs(user!)
    const page = await visit(route('admin.users.index'))

    await page.getByPlaceholder('search').fill(user!.email)
    await page.keyboard.press('Enter')

    await page.assertElementsCount('tbody tr', 1)

    await page.assertExists(
      page.locator('tbody tr:first-child > td:nth-of-type(2)', { hasText: user!.email })
    )
  })

  test('should change order of list', async ({ browserContext, visit, route }) => {
    const user2 = await UserFactory.merge({ email: 'romain@adonisjs.com' }).create()

    await browserContext.loginAs(user!)
    const page = await visit(route('admin.users.index'))

    await page.locator('select[name="order"]').selectOption('email+asc')
    await page.keyboard.press('Enter')

    await page.assertExists(
      page.locator('tbody tr:first-child > td:nth-of-type(2)', { hasText: user2.email })
    )
  })

  test('should filter by admin user', async ({ browserContext, visit, route }) => {
    await UserFactory.createMany(12)

    await browserContext.loginAs(user!)
    const page = await visit(route('admin.users.index'))

    await page.getByRole('button', { name: 'Filters' }).click()

    await page.locator('select[name="role"]').selectOption(`${Roles.ADMIN}`)
    await page.keyboard.press('Enter')

    await page.assertElementsCount('tbody tr', 1)
  })

  test('should filter by disabled status', async ({ browserContext, visit, route }) => {
    await UserFactory.apply('disabled').createMany(2)
    await UserFactory.createMany(7)

    await browserContext.loginAs(user!)
    const page = await visit(route('admin.users.index'))

    await page.assertElementsCount('tbody tr', 10)

    await page.getByRole('button', { name: 'Filter' }).click()

    await page.getByLabel('Disabled').click()
    await page.keyboard.press('Enter')

    await page.assertElementsCount('tbody tr', 2)
  })

  test('should clear filter', async ({ browserContext, visit, route }) => {
    await UserFactory.createMany(9)

    await browserContext.loginAs(user!)
    const page = await visit(route('admin.users.index'))

    await page.assertElementsCount('tbody tr', 10)

    await page.getByPlaceholder('search').fill(user!.email)
    await page.keyboard.press('Enter')

    await page.assertElementsCount('tbody tr', 1)

    await page.getByRole('button', { name: 'Clear all' }).click()

    await page.assertElementsCount('tbody tr', 10)
  })
})
