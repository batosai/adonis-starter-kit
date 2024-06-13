import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'
import User from '#core/models/user'

export default class AuditPolicy extends BasePolicy {
  viewList(currentUser: User): AuthorizerResponse {
    return currentUser.isAdmin
  }

  show(currentUser: User): AuthorizerResponse {
    return currentUser.isAdmin
  }
}
