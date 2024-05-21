import { assert } from '@japa/assert'
import app from '@adonisjs/core/services/app'
import type { Config } from '@japa/runner/types'
import { pluginAdonisJS } from '@japa/plugin-adonisjs'
import { apiClient } from '@japa/api-client'
import testUtils from '@adonisjs/core/services/test_utils'
import { shieldApiClient } from '@adonisjs/shield/plugins/api_client'
import { sessionApiClient } from '@adonisjs/session/plugins/api_client'
import { authApiClient } from '@adonisjs/auth/plugins/api_client'
import { browserClient } from '@japa/browser-client'
import { firefox } from 'playwright'
import env from '#start/env'


import i18n from '#tests/plugins/i18n'

/**
 * This file is imported by the "bin/test.ts" entrypoint file
 */

/**
 * Configure Japa plugins in the plugins array.
 * Learn more - https://japa.dev/docs/runner-config#plugins-optional
 */
export const plugins: Config['plugins'] = [
  assert(),
  apiClient(),
  pluginAdonisJS(app),
  sessionApiClient(app),
  authApiClient(app),
  shieldApiClient(),
  browserClient({
    runInSuites: ['browser'],
    async launcher(options) {
      return firefox.launch({
        ...options,
        headless: env.get('TEST_HEADLESS'),
        slowMo: 300,
      })
    },
  }),
  i18n()
]

/**
 * Configure lifecycle function to run before and after all the
 * tests.
 *
 * The setup functions are executed before all the tests
 * The teardown functions are executer after all the tests
 */
export const runnerHooks: Required<Pick<Config, 'setup' | 'teardown'>> = {
  setup: [
    () => testUtils.db().migrate(),
  ],
  teardown: [],
}

/**
 * Configure suites by tapping into the test suite instance.
 * Learn more - https://japa.dev/docs/test-suites#lifecycle-hooks
 */
export const configureSuite: Config['configureSuite'] = (suite) => {
  if (['browser', 'functional', 'unit'].includes(suite.name)) {
    return suite.setup(() => testUtils.httpServer().start())
  }
}

export const reporters: Config['reporters'] = {
  activated: ['spec']
}
