import { defineConfig } from '@adonisjs/core/app'

export default defineConfig({
  /*
  |--------------------------------------------------------------------------
  | Commands
  |--------------------------------------------------------------------------
  |
  | List of ace commands to register from packages. The application commands
  | will be scanned automatically from the "./commands" directory.
  |
  */
  commands: [
    () => import('@adonisjs/core/commands'),
    () => import('@adonisjs/lucid/commands'),
    () => import('@adonisjs/mail/commands'),
    () => import('@adonisjs/bouncer/commands'),
    () => import('adonis-lucid-filter/commands'),
    () => import('@jrmc/adonis-lucid-commands/commands')
  ],

  /*
  |--------------------------------------------------------------------------
  | Service providers
  |--------------------------------------------------------------------------
  |
  | List of service providers to import and register when booting the
  | application
  |
  */
  providers: [
    () => import('@adonisjs/core/providers/app_provider'),
    () => import('@adonisjs/core/providers/hash_provider'),
    {
      file: () => import('@adonisjs/core/providers/repl_provider'),
      environment: ['repl', 'test'],
    },
    () => import('@adonisjs/core/providers/vinejs_provider'),
    () => import('@adonisjs/core/providers/edge_provider'),
    () => import('@adonisjs/session/session_provider'),
    () => import('@adonisjs/vite/vite_provider'),
    () => import('@adonisjs/shield/shield_provider'),
    () => import('@adonisjs/static/static_provider'),
    () => import('@adonisjs/lucid/database_provider'),
    () => import('@adonisjs/auth/auth_provider'),
    () => import('@adonisjs/mail/mail_provider'),
    () => import('@adonisjs/i18n/i18n_provider'),
    () => import('@adonisjs/bouncer/bouncer_provider'),
    () => import('@jrmc/edge-components/edge_components_provider'),
    () => import('@jrmc/adonis-unpoly/unpoly_provider'),
    () => import('adonis-lucid-filter/provider'),
    () => import('@stouder-io/adonis-auditing/auditing_provider'),
    () => import('@jrmc/adonis-attachment/attachment_provider'),
    () => import('@adonisjs/drive/drive_provider'),
  ],

  /*
  |--------------------------------------------------------------------------
  | Preloads
  |--------------------------------------------------------------------------
  |
  | List of modules to import before starting the application.
  |
  */
  preloads: [
    () => import('#start/kernel'),
    () => import('#start/routes'),
    () => import('#start/events'),
    () => import('#start/view'),

    // core
    () => import('./src/core/start/view.js'),

    // auth
    () => import('./src/auth/start/routes.js'),
    () => import('./src/auth/start/view.js'),
    () => import('./src/auth/start/validator.js'),

    // admin
    () => import('./src/admin/start/routes.js'),
    () => import('./src/admin/start/view.js'),
  ],

  /*
  |--------------------------------------------------------------------------
  | Tests
  |--------------------------------------------------------------------------
  |
  | List of test suites to organize tests by their type. Feel free to remove
  | and add additional suites.
  |
  */
  tests: {
    suites: [
      {
        files: [
          'tests/functional/**/*.spec(.ts|.js)',
          'src/**/tests/functional/**/*.spec(.ts|.js)',
        ],
        name: 'functional',
        timeout: 30000,
      },
      {
        files: ['tests/unit/**/*.spec(.ts|.js)', 'src/**/tests/unit/**/*.spec(.ts|.js)'],
        name: 'unit',
        timeout: 2000,
      },
      {
        files: ['tests/browser/**/*.spec(.ts|.js)', 'src/**/tests/browser/**/*.spec(.ts|.js)'],
        name: 'browser',
        timeout: 300000,
      },
    ],
    forceExit: false,
  },

  metaFiles: [
    {
      pattern: 'src/**/resources/views/**/*.edge',
      reloadServer: false,
    },
    {
      pattern: 'public/**',
      reloadServer: false,
    },
    {
      pattern: 'src/**/resources/lang/**/*.{json,yaml,yml}',
      reloadServer: false,
    },
  ],

  directories: {
    audit_resolvers: 'src/core/app/audit_resolvers',
  },

  assetsBundler: false,
  hooks: {
    onBuildStarting: [() => import('@adonisjs/vite/build_hook')],
  },
})
