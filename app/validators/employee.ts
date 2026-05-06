import vine from '@vinejs/vine'

export const createEmployeeValidator = vine.create({
    departmensId: vine.number().exists({table: 'departmens', column: 'id'}),
    positionsId: vine.number().exists({table: 'positions', column: 'id'}),
    fullName: vine.string().maxLength(100),
    email: vine.string().email().maxLength(100).unique({table: 'employees', column: 'email'}),
    phone: vine.string().minLength(9).maxLength(15).unique({table: 'employees', column: 'phone'}),
    hireDate: vine.date({formats: ['YYYY-MM-DD']})
})

export const updateEmployeeValidator = vine.create({
    departmensId: vine.number().exists({table: 'departmens', column: 'id'}),
    positionsId: vine.number().exists({table: 'positions', column: 'id'}),
    fullName: vine.string().maxLength(100),
    email: vine.string().email().maxLength(100).unique(
        async (db, value, field) => {
            const code = field.meta.code
            const existedEmail = await db.from('employees').where('email', value).whereNot('employee_code', code).first()
            return !existedEmail
        }
    ),
    phone: vine.string().minLength(9).maxLength(15).unique(
        async (db, value, field) => {
            const code = field.meta.code
            const existedPhone = await db.from('employees').where('phone', value).whereNot('employee_code', code).first()
            return !existedPhone
        }
    ),
    hireDate: vine.date({formats: ['YYYY-MM-DD']})
})