import type { HttpContext } from '@adonisjs/core/http'
import router from '@adonisjs/core/services/router'
import Audit from '#core/models/audit'
import AuditPolicy from '#core/policies/audit_policy'

export default class AuditsController {
  async index({ view, request, bouncer }: HttpContext) {
    await bouncer.with(AuditPolicy).authorize('viewList')

    const page = request.input('page', 1)
    const limit = 10

    const audits = await Audit.query().orderBy('createdAt', 'desc').paginate(page, limit)
    audits.baseUrl(router.builder().make('admin.audits.index'))

    return view.render('admin::pages/audits/index', {
      audits,
    })
  }

  async show({ view, request, bouncer }: HttpContext) {
    await bouncer.with(AuditPolicy).authorize('show')

    const audit = await Audit.findOrFail(request.param('id'))

    return view.render('admin::pages/audits/show', {
      audit,
    })
  }
}
