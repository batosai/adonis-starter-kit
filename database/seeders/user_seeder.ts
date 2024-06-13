import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Roles from '#core/enums/roles'
import User from '#core/models/user'

export default class extends BaseSeeder {
  async run() {
    await User.create(
      {
        role: Roles.ADMIN,
        lastname: 'Chaufourier',
        firstname: 'Jeremy',
        email: 'jeremy@chaufourier.fr',
        password: 'secret',
      },
    )
  }
}
