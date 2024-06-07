import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'
import User from '#core/models/user'

export default class ImpersonatePolicy extends BasePolicy {
  create(currentUser: User, user: User): AuthorizerResponse {
    return currentUser.isAdmin && currentUser.id !== user.id
  }

  delete(currentUser: User): AuthorizerResponse {
    return currentUser.isAdmin
  }
}
