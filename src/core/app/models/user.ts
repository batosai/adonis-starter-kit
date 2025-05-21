import crypto from 'node:crypto'
import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, computed, column, beforeCreate, scope, beforeSave } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbRememberMeTokensProvider } from '@adonisjs/auth/session'
import { Filterable } from 'adonis-lucid-filter'
import Roles from '#core/enums/roles'
import UserFilter from '#core/models/filters/user_filter'
import { Auditable } from '@stouder-io/adonis-auditing'
import { attachment } from '@jrmc/adonis-attachment'
import type { Attachment } from '@jrmc/adonis-attachment/types/attachment'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, Filterable, Auditable, AuthFinder) {
  static selfAssignPrimaryKey = true
  static $filter = () => UserFilter
  static rememberMeTokens = DbRememberMeTokensProvider.forModel(User)

  @column({ isPrimary: true })
  declare id: string

  @column()
  declare role: string

  @column()
  declare firstname: string

  @column()
  declare lastname: string

  @column()
  declare email: string

  @column()
  declare password: string

  @column()
  declare disabled: boolean

  @attachment({
    folder: 'avatars',
    variants: ['thumbnail']
  })
  declare avatar: Attachment | null

  @column.dateTime({ autoCreate: false })
  declare disabledOn: DateTime | null

  @column.dateTime({ autoCreate: false })
  declare lastLoginAt: DateTime

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  // scopes

  static admin = scope((query: any) => {
    query.where('role', Roles.ADMIN)
  })

  // Computed

  @computed()
  get isAdmin() {
    return this.role === Roles.ADMIN
  }

  @computed()
  get isUser() {
    return this.role === Roles.USER
  }

  @computed()
  get fullname() {
    return `${this.firstname} ${this.lastname}`
  }

  // Hooks

  @beforeCreate()
  static assignUuid(user: User) {
    user.id = crypto.randomUUID()
  }

  @beforeCreate()
  static defaultPassword(user: User) {
    if (!user.password) {
      user.password = crypto.randomUUID()
    }
  }

  @beforeSave()
  static async disabledDate(user: User) {
    if (user.$dirty.disabled) {
      if (user.disabled === true) {
        user.disabledOn = DateTime.local()
      } else {
        user.disabledOn = null
      }
    }
  }
}
