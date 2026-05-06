import vine from '@vinejs/vine'

export const createPositionValidator = vine.create({
    positionsName: vine.string().maxLength(100).unique({ table: 'positions', column: 'positions_name' }),
    departmenId: vine.number().exists({ table: 'departmens', column: 'id' })
})

export const updatePositionValidator = vine.create({
    positionsName: vine.string().maxLength(100).unique(
        async (db, value, field) => {
            const id = field.meta.id
            const positions = await db.from('positions').where('positions_name', value).whereNot('id', id).first()
            return !positions
        }
    ),
    departmenId: vine.number().exists({ table: 'departmens', column: 'id' })
})