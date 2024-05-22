import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'
import { UserFactory } from '#database/factories/user_factory'

test.group('Login page', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  test('should display error message if validation with empty fields', async ({ visit, route }) => {
    const page = await visit(route('auth.password.create'))
    await page.locator('text=validate').click()

    await page.assertElementsCount(await page.getByText(/The email field must be defined/), 1)
  })

  test('should display success message', async ({ visit, route, i18n }) => {
    const user = await UserFactory.create()

    const page = await visit(route('auth.password.create'))

    await page.locator('input[name="email"]').fill(user.email)
    await page.locator('text=validate').click()

    await page.assertElementsCount(
      await page.getByText(i18n.formatMessage('form.success.forgotPassword')),
      1
    )
  })
})
