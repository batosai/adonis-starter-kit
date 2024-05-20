import { test } from '@japa/runner'
import { validator } from '@vinejs/vine/factories'
import { oneLowerCaseAtLeastRule } from '../../../start/rules/one_lower_case_at_least.js'

test.group('Validator rule : oneLowerCaseAtLeast', () => {
  test('has one lower case at least: failed', async () => {
    const value = 'ADONISJS'
    const oneLowerCaseAtLeast = oneLowerCaseAtLeastRule({})

    const validated = await validator.executeAsync(oneLowerCaseAtLeast, value)

    validated.assertFailed()
  })

  test('has one lower case at least: success', async () => {
    const value = 'Adonisjs'
    const oneLowerCaseAtLeast = oneLowerCaseAtLeastRule({})

    const validated = await validator.executeAsync(oneLowerCaseAtLeast, value)

    validated.assertSucceeded()
  })
})
