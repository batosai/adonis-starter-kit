import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import { ModelObject } from '@adonisjs/lucid/types/model'

export default class Audit extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userType: string | null

  @column()
  declare userId: string | null

  @column()
  declare event: 'create' | 'update' | 'delete'

  @column()
  declare auditableType: string

  @column()
  declare auditableId: number

  @column({
    consume: (value) => (value ? JSON.parse(value) : null),
    prepare: (value) => (value ? JSON.stringify(value) : null),
    serialize: (value) => (value ? value : null),
  })
  declare oldValues: ModelObject | null

  @column({
    consume: (value) => (value ? JSON.parse(value) : null),
    prepare: (value) => (value ? JSON.stringify(value) : null),
    serialize: (value) => (value ? value : null),
  })
  declare newValues: ModelObject | null

  @column({
    consume: (value) => (value ? JSON.parse(value) : null),
    prepare: (value) => (value ? JSON.stringify(value) : null),
    serialize: (value) => (value ? value : null),
  })
  declare metadata: ModelObject | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
