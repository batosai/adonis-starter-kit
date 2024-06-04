import { test } from '@japa/runner'

test.group('Admin', () => {
  test('admin visit should redirect to login page', async ({ client, route }) => {
    const response = await client.get(route('admin.dashboard'))

    response.assertRedirectsTo('/auth/login')
  })
})
