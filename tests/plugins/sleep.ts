import { TestContext } from '@japa/runner/core'

declare module '@japa/runner/core' {
  interface TestContext {
    sleep(milliseconds: number): Promise<void>
  }
}

export default function i18n() {
  return function () {
    TestContext.macro('sleep', function (milliseconds: number) {
      return new Promise((resolve) => {
        setTimeout(resolve, milliseconds)
      })
    })
  }
}
