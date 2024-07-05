import { defineConfig } from '@jrmc/adonis-attachment'
import app from '@adonisjs/core/services/app'

export default defineConfig({
  basePath: app.publicPath(),
  converters: [
    {
      key: 'thumbnail',
      converter: () => import('@jrmc/adonis-attachment/converters/image_converter'),
      options: {
        resize: 300,
        format: 'webp',
      }
    }
  ]
})
