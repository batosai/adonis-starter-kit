import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'
import Roles from '#enums/roles'

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
