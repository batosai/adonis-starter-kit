import vine from '@vinejs/vine'
import Roles from '#core/enums/roles'
import User from '#core/models/user'

export const MIN_LENGTH = 2
export const MAX_LENGTH = 50
export const MAX_SIZE = '10mb'
export const PASSWORD_MIN_LENGTH = 8
export const PASSWORD_MAX_LENGTH = 255

export const UserValidator = vine.withMetaData<{ currentUser?: User; record?: User }>().compile(
  vine.object({
    logo: vine
      .file({
        size: '2mb',
        extnames: ['jpg', 'png', 'webp'],
      })
      .optional(),
    lastname: vine.string().trim().toCamelCase().minLength(MIN_LENGTH).maxLength(MAX_LENGTH),
    firstname: vine.string().trim().toCamelCase().minLength(MIN_LENGTH).maxLength(MAX_LENGTH),
    email: vine
      .string()
      .trim()
      .toLowerCase()
      .email()
      .unique(async (db, value, field) => {
        const query = db.from('users').where('email', value)

        if (field.meta.record) {
          query.whereNot('id', field.meta.record.id)
        }

        return !(await query.first())
      }),
    password: vine
      .string()
      .minLength(PASSWORD_MIN_LENGTH)
      .maxLength(PASSWORD_MAX_LENGTH)
      .oneLowerCaseAtLeast()
      .oneNumericAtLeast()
      .oneUpperCaseAtLeast()
      .oneSpecialCharacterAtLeast()
      .confirmed()
      .optional(),
    role: vine
      .enum((field) => {
        if (field.meta.currentUser.isAdmin && field.meta.currentUser.id !== field.meta.record?.id) {
          return Object.values(Roles)
        }

        return [Roles.USER] as const
      })
      .optional(),
  })
)
