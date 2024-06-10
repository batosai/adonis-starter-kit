import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class DefaultMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    /**
     * Sharing up with templates
     */
    if ('view' in ctx) {
      ctx.view.share({
        up: ctx.up,
      })
    }

    /**
     * Call next middlewares or route handler
     */
    const response = await next()

    /**
     * Commit headers
     */
    await ctx.up.commit()

    /**
     * Return response
     */
    return response
  }
}
