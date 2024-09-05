import app from '@adonisjs/core/services/app'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Roles from '#core/enums/roles'
import User from '#core/models/user'
import { attachmentManager } from '@jrmc/adonis-attachment'
import { readFile } from 'fs/promises'

export default class extends BaseSeeder {
  async run() {
    const buffer = await readFile(app.makePath('database/seeders/resources/me.jpg'))
    const user = await User.create(
      {
        role: Roles.ADMIN,
        lastname: 'Chaufourier',
        firstname: 'Jeremy',
        email: 'jeremy@chaufourier.fr',
        password: 'secret',
      },
    )

    user.avatar = await attachmentManager.createFromBuffer(buffer, 'avatar.jpg')
    await user.save()
  }
}
