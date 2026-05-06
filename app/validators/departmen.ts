import vine from '@vinejs/vine'

export const createDepartmenValidator = vine.create({
    departmenName: vine.string().maxLength(100).unique({table: 'departmens', column: 'departmen_name'})
})

export const updateDepartmenValidator = vine.create({
    departmenName: vine.string().maxLength(100).unique(
        async (db, value, field) => {
            const id = field.meta.id
            const departmen = await db.from('departmens').where('departmen_name', value).whereNot('id', id).first()
            return !departmen
        }
    )
})