import { DepartmenSchema } from '#database/schema'
import { belongsTo } from '@adonisjs/lucid/orm'
import Employee from './employee.ts'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Departmen extends DepartmenSchema {
    @belongsTo(() => Employee)
    declare employee: BelongsTo<typeof Employee>
}