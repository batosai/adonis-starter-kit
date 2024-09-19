import { HttpContext } from '@adonisjs/core/http'
import { Resolver } from '@stouder-io/adonis-auditing'

export default class UrlResolver implements Resolver {
  async resolve(ctx: HttpContext) {
    return ctx.request.url(true)
  }
}
