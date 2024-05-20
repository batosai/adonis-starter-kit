import { test } from '@japa/runner'
import { validator } from '@vinejs/vine/factories'
import { oneNumericAtLeastRule } from '../../../start/rules/one_numeric_at_least.js'

test.group('Validator rule : oneNumericAtLeast', () => {
  test('has one numeric at least: failed', async () => {
    const value = 'Adonisjs'
    const oneNumericAtLeast = oneNumericAtLeastRule({})

    const validated = await validator.executeAsync(oneNumericAtLeast, value)

    validated.assertFailed()
  })
  test('has one numeric at least: success', async () => {
    const value = 'Adonisjs1'
    const oneNumericAtLeast = oneNumericAtLeastRule({})

    const validated = await validator.executeAsync(oneNumericAtLeast, value)

    validated.assertSucceeded()
  })
})
