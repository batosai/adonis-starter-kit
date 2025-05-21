import adonisjs from '@adonisjs/vite/client'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
    adonisjs({
      /**
       * Entrypoints of your application. Each entrypoint will
       * result in a separate bundle.
       */
      entrypoints: ['src/core/resources/js/app.js'],

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
