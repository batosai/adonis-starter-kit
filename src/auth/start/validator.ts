import { VineString } from '@vinejs/vine'
import { oneLowerCaseAtLeastRule } from './rules/one_lower_case_at_least.js'
import { oneNumericAtLeastRule } from './rules/one_numeric_at_least.js'
import { oneSpecialCharacterAtLeastRule } from './rules/one_special_character_at_least.js'
import { oneUpperCaseAtLeastRule } from './rules/one_upper_case_at_least.js'

declare module '@vinejs/vine' {
  interface VineString {
    oneLowerCaseAtLeast(): this
    oneUpperCaseAtLeast(): this
    oneNumericAtLeast(): this
    oneSpecialCharacterAtLeast(): this
  }
}

VineString.macro('oneLowerCaseAtLeast', function (this: VineString) {
  return this.use(oneLowerCaseAtLeastRule({}))
})

VineString.macro('oneUpperCaseAtLeast', function (this: VineString) {
  return this.use(oneUpperCaseAtLeastRule({}))
})

VineString.macro('oneNumericAtLeast', function (this: VineString) {
  return this.use(oneNumericAtLeastRule({}))
})

VineString.macro('oneSpecialCharacterAtLeast', function (this: VineString) {
  return this.use(oneSpecialCharacterAtLeastRule({}))
})
