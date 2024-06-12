import { HttpContext } from '@adonisjs/core/http'
import { UserResolver } from '@stouder-io/adonis-auditing'

export default class implements UserResolver {
  async resolve({ auth }: HttpContext): Promise<{ id: string; type: string } | null> {
    return auth.user ? { id: auth.user.id, type: 'User' } : null
  }
}
