import type { I18n } from '@adonisjs/i18n'
import i18nManager from '@adonisjs/i18n/services/main'
import { TestContext } from '@japa/runner/core'

declare module '@japa/runner/core' {
  interface TestContext {
    i18n: I18n
  }
}

export default function i18n() {
  return function () {
    const i18n = i18nManager.locale(i18nManager.defaultLocale)
    TestContext.getter(
      'i18n',
      function (this: TestContext) {
        return i18n
      },
      true
    )
  }
}
