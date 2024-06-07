import type { Authenticators } from '@adonisjs/auth/types'
import type { HttpContext } from '@adonisjs/core/http'
import router from '@adonisjs/core/services/router'
import type { NextFn } from '@adonisjs/core/types/http'

/**
 * Auth middleware is used authenticate HTTP requests and deny
 * access to unauthenticated users.
 */
export default class AuthMiddleware {
  /**
   * The URL to redirect to, when authentication fails
   */
  redirectTo = router.builder().make('auth.session.create')

  async handle(
    ctx: HttpContext,
    next: NextFn,
    options: {
      guards?: (keyof Authenticators)[]
    } = {}
  ) {
    if (ctx.request.url()) {
      this.redirectTo = router
        .builder()
        .qs({
          redirect_to: ctx.request.url(),
        })
        .make('auth.session.create')
    }

    await ctx.auth.authenticateUsing(options.guards, { loginRoute: this.redirectTo })

    // Force deconnexion if disabled account
    if (ctx.auth.user?.disabled) {
      for (let guard of options.guards || [ctx.auth.defaultGuard]) {
        await ctx.auth.use(guard).logout()
      }
    }

    return next()
  }
}
