import vine from '@vinejs/vine'
import { FieldContext } from '@vinejs/vine/types'

export type Options = {}

/**
 * Implementation
 */
async function oneNumericAtLeast(value: unknown, _options: Options, field: FieldContext) {
  if (typeof value !== 'string') {
    return
  }

  const regex = new RegExp('(?=.*[0-9])')
  if (!regex.test(value)) {
    field.report(
      'The {{ field }} must contain at least 1 numeric character',
      'oneNumericAtLeast',
      field
    )
  }
}

/**
 * Converting a function to a VineJS rule
 */
export const oneNumericAtLeastRule = vine.createRule(oneNumericAtLeast)
