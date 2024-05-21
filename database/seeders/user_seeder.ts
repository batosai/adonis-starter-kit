import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#core/models/user'
import Roles from '#core/enums/roles'

export default class extends BaseSeeder {
  async run() {
    await User.createMany([
      {
        role: Roles.ADMIN,
        lastname: 'Chaufourier',
        firstname: 'Jeremy',
        email: 'jeremy@chaufourier.fr',
        password: 'secret',
      },
    ])
  }
}
