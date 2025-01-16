import vine from '@vinejs/vine'
import { FieldContext } from '@vinejs/vine/types'

export type Options = {}

/**
 * Implementation
 */
async function oneUpperCaseAtLeast(value: unknown, _options: Options, field: FieldContext) {
  if (typeof value !== 'string') {
    return
  }

  const regex = new RegExp('(?=.*[A-Z])')
  if (!regex.test(value)) {
    field.report(
      'The {{ field }} must contain at least one uppercase letter',
      'oneUpperCaseAtLeast',
      field
    )
  }
}

/**
 * Converting a function to a VineJS rule
 */
export const oneUpperCaseAtLeastRule = vine.createRule(oneUpperCaseAtLeast)
