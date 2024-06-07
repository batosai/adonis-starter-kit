import type { HttpContext } from '@adonisjs/core/http'
import ImpersonatePolicy from '#auth/policies/impersonate_policy'
import User from '#core/models/user'

export default class ImpersonatesController {
  async store({ session, bouncer, params, response, auth }: HttpContext) {
    const impersonatedUser = await User.findOrFail(params.id)
    await bouncer.with(ImpersonatePolicy).authorize('create', impersonatedUser!)

    session.put('originalUserId', auth.user!.id)
    await auth.use('web').login(impersonatedUser)

    response.redirect().toRoute('home')
  }

  async destroy({ session, response, auth }: HttpContext) {
    const originalUserId = session.get('originalUserId')
    const originalUser = await User.findOrFail(originalUserId)

    await auth.use('web').login(originalUser)
    session.forget('originalUserId')

    response.redirect().toRoute('home')
  }
}
