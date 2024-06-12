import { HttpContext } from '@adonisjs/core/http'
import { Resolver } from '@stouder-io/adonis-auditing'

export default class UserFullnameResolver implements Resolver {
  async resolve(ctx: HttpContext) {
    return ctx.auth.user!.fullname
  }
}
