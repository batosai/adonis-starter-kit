import vine from '@vinejs/vine'

export const PASSWORD_MIN_LENGTH = 8
export const PASSWORD_MAX_LENGTH = 255

export const ForgotPasswordValidator = vine.compile(
  vine.object({
    email: vine.string().trim().email(),
  })
)

export const ResetPasswordValidator = vine.compile(
  vine.object({
    email: vine
      .string()
      .trim()
      .email()
      .exists(async (db, value) => await db.from('users').where('email', value).first()),
    password: vine
      .string()
      .confirmed()
      .minLength(PASSWORD_MIN_LENGTH)
      .maxLength(PASSWORD_MAX_LENGTH)
      .oneLowerCaseAtLeast()
      .oneNumericAtLeast()
      .oneUpperCaseAtLeast()
      .oneSpecialCharacterAtLeast(),
  })
)
