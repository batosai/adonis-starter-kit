import { test } from '@japa/runner'
import { validator } from '@vinejs/vine/factories'
import { oneUpperCaseAtLeastRule } from '../../../start/rules/one_upper_case_at_least.js'

test.group('Validator rule : oneUpperCaseAtLeast', () => {
  test('has one upper case at least: failed', async () => {
    const value = 'adonisjs'
    const oneUpperCaseAtLeast = oneUpperCaseAtLeastRule({})

    const validated = await validator.executeAsync(oneUpperCaseAtLeast, value)

    validated.assertFailed()
  })

  test('has one upper case at least: success', async () => {
    const value = 'Adonisjs'
    const oneUpperCaseAtLeast = oneUpperCaseAtLeastRule({})

    const validated = await validator.executeAsync(oneUpperCaseAtLeast, value)

    validated.assertSucceeded()
  })
})
