import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'
import Roles from '#core/enums/roles'
import User from '#core/models/user'
import { UserFactory } from '#database/factories/user_factory'

// test.group('Admin impersonate user', (group) => {
//   let user: User | null = null

//   group.each.setup(async () => {
//     await Database.beginGlobalTransaction()

//     user = await UserFactory.merge({
//       password: 'secret',
//       email: 'virk@adonisjs.com',
//       role: Roles.ADMIN,
//     }).create()

//     return async () => {
//       await Database.rollbackGlobalTransaction()
//     }
//   })

//   test('should impersonate success', async ({ login, visit, route }) => {
//     const customer = await UserFactory.create()

//     await login(user!.email, 'secret')

//     const page = await visit(route('admin.users.edit', customer))

//     await page.getByRole('button', { name: 'Yes, impersonate' }).click()
//     await page.locator('.modal').getByRole('button', { name: 'ok' }).click()

//     await page.assertTextContains('body', customer.firstname)
//     await page.assertTextContains('body', customer.lastname)

//     await page.locator('form').getByRole('button').click()

//     await page.assertTextContains('body', user!.firstname)
//     await page.assertTextContains('body', user!.lastname)
//   })
// })
