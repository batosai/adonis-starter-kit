import vine from '@vinejs/vine'
import { FieldContext } from '@vinejs/vine/types'

export type Options = {}

/**
 * Implementation
 */
async function oneSpecialCharacterAtLeast(value: unknown, _options: Options, field: FieldContext) {
  if (typeof value !== 'string') {
    return
  }

  const regex = new RegExp('(?=.*[!@#$%^&*])')
  if (!regex.test(value)) {
    field.report(
      'The {{ field }} must contain at least one special character',
      'oneSpecialCharacterAtLeast',
      field
    )
  }
}

/**
 * Converting a function to a VineJS rule
 */
export const oneSpecialCharacterAtLeastRule = vine.createRule(oneSpecialCharacterAtLeast)
