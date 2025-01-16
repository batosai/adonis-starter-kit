import vine from '@vinejs/vine'
import { FieldContext } from '@vinejs/vine/types'

export type Options = {}

/**
 * Implementation
 */
async function oneLowerCaseAtLeast(value: unknown, _options: Options, field: FieldContext) {
  const regex = new RegExp('(?=.*[a-z])')
  if (!regex.test(String(value))) {
    field.report(
      'The {{ field }} must contain at least one lowercase letter',
      'oneLowerCaseAtLeast',
      field
    )
  }
}

/**
 * Converting a function to a VineJS rule
 */
export const oneLowerCaseAtLeastRule = vine.createRule(oneLowerCaseAtLeast)
