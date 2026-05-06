import { PositionSchema } from '#database/schema'
import { belongsTo, hasMany } from '@adonisjs/lucid/orm'
import Employee from './employee.ts'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Departmen from './departmen.ts'

export default class Position extends PositionSchema {
    @hasMany(() => Employee, {
        foreignKey: 'positionsId'
    })
    declare employees: HasMany<typeof Employee>

    @belongsTo(() => Departmen, { foreignKey: 'departmensId' })
    declare departmens: BelongsTo<typeof Departmen>
}