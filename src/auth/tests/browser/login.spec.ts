import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'
import { UserFactory } from '#database/factories/user_factory'

test.group('Login page', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())
  test('should display login page', async ({ visit, route }) => {
    const page = await visit(route('auth.session.create'))
    await page.assertExists('input[name="email"]')
  })

  test('should display error message if validation with empty fields', async ({ visit, route }) => {
    const page = await visit(route('auth.session.create'))
    await page.locator('text=validate').click()

    await page.assertElementsCount(await page.getByText(/Invalid user credentials/), 1)
  })

  test('should display admin after validation login form', async ({ visit, route, i18n }) => {
    const user = await UserFactory.merge({ password: 'secret' }).create()

    const page = await visit(route('auth.session.create'))

    await page.locator('input[name="email"]').fill(user.email)
    await page.locator('input[name="password"]').fill('secret')

    // await page.pause()

    await page.locator('text=validate').click()

    // await page.screenshot({ path: 'screenshot.png', fullPage: true })

    await page.assertElementsCount(
      await page.getByText(i18n.formatMessage('form.success.session')),
      1
    )
  })

  test('should display error message for blocked user', async ({ visit, route }) => {
    const user = await UserFactory.apply('disabled').merge({ password: 'secret' }).create()

    const page = await visit(route('auth.session.create'))

    await page.locator('input[name="email"]').fill(user.email)
    await page.locator('input[name="password"]').fill('secret')
    await page.locator('text=validate').click()

    await page.assertTextContains('body', 'Your account is disabled')
  })

  test('should create cookie after check remember me', async ({ visit, route }) => {
    const user = await UserFactory.merge({ password: 'secret' }).create()

    const page = await visit(route('auth.session.create'))

    await page.locator('input[name="email"]').fill(user.email)
    await page.locator('input[name="password"]').fill('secret')
    await page.getByLabel('Remember me').click()
    await page.locator('text=validate').click()

    await page.assertCookie('remember_web')
  })
})
