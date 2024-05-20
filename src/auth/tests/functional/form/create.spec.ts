import { test } from '@japa/runner'

test.group('Auth create', () => {
  test('should display login page', async ({ client, route }) => {
    const response = await client.get(route('auth.session.create'))

    response.assertStatus(200)
    response.assertTextIncludes('Your email')
  })
})
