import { test } from '@japa/runner'
import { validator } from '@vinejs/vine/factories'
import { oneSpecialCharacterAtLeastRule } from '../../../start/rules/one_special_character_at_least.js'

test.group('Validator rule : oneSpecialCharacterAtLeast', () => {
  test('has one special character at least: failed', async () => {
    const value = 'adonisjs'
    const oneSpecialCharacterAtLeast = oneSpecialCharacterAtLeastRule({})

    const validated = await validator.executeAsync(oneSpecialCharacterAtLeast, value)

    validated.assertFailed()
  })

  test('has one special character at least: success', async () => {
    const value = '@donisjs'
    const oneSpecialCharacterAtLeast = oneSpecialCharacterAtLeastRule({})

    const validated = await validator.executeAsync(oneSpecialCharacterAtLeast, value)

    validated.assertSucceeded()
  })
})
