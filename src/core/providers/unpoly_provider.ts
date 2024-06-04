import { HttpContext } from '@adonisjs/core/http'
import type { ApplicationService } from '@adonisjs/core/types'
import Up from './unpoly/up.js'

declare module '@adonisjs/core/http' {
  export interface HttpContext {
    up: Up
  }
}

export default class UnpolyProvider {
  constructor(protected app: ApplicationService) {}

  /**
   * The container bindings have booted
   */
  async boot() {
    HttpContext.getter(
      'up',
      function (this: HttpContext) {
        return new Up(this)
      },
      true
    )
  }
}
