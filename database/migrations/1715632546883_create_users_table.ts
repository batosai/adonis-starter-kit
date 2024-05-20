import { BaseSchema } from '@adonisjs/lucid/schema'
import Roles from '#core/enums/roles'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().notNullable().index()
      table.enu('role', Object.values(Roles)).notNullable().defaultTo(Roles.USER)
      table.string('lastname', 255).notNullable().index()
      table.string('firstname', 255).notNullable().index()
      table.string('email', 254).notNullable().unique()
      table.string('password').notNullable()
      table.json('avatar')
      table.boolean('disabled').notNullable().defaultTo(false)

      table.timestamp('disabled_on')
      table.timestamp('last_login_at')
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
