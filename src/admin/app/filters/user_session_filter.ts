import Roles from '#core/enums/roles'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'

@inject()
export default class UserSessionFilter {
  constructor(private ctx: HttpContext) {}

  async handle() {
    const { request, session } = this.ctx
    let { page = 1, reset, ...data } = request.qs()

    if (!Object.keys(data).length && session.has('usersFilter')) {
      data = session.get('usersFilter')
    }

    if (reset) {
      if (reset === 'all') {
        data = {}
        session.forget('usersFilter')
        return data
      } else {
        delete data[reset]
      }
    }

    if (data.role === '') {
      delete(data.role)
    }

    if (data.order === '') {
      delete(data.order)
    }

    const validator = vine.compile(
      vine.object({
        search: vine.string().optional(),
        role: vine.enum(Object.values(Roles)).optional(),
        disabled: vine.boolean().optional(),
        order: vine.string().optional(),
      })
    )

    data = await validator.validate(data)

    if (Object.keys(data).length) {
      data.page = page
      session.put('usersFilter', data)
    } else {
      session.forget('usersFilter')
    }

    data.page = page

    return data
  }

}
