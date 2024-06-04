import adonisjs from '@adonisjs/vite/client'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    adonisjs({
      /**
       * Entrypoints of your application. Each entrypoint will
       * result in a separate bundle.
       */
      entrypoints: ['src/core/resources/css/app.css', 'src/core/resources/js/app.js'],

      /**
       * Paths to watch and reload the browser on file change
       */
      reload: [
        'src/**/resources/views/**/*.edge',
        'src/**/resources/css/**/*.css',
        'src/**/resources/js/**/*.js',
      ],
    }),
  ],
})
