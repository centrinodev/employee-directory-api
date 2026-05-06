import { DepartmenSchema } from '#database/schema'
import { belongsTo, hasMany } from '@adonisjs/lucid/orm'
import Employee from './employee.ts'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Position from './position.ts'

export default class Departmen extends DepartmenSchema {
    @hasMany(() => Employee, {
        foreignKey: 'departmensId'
    })
    declare employees: HasMany<typeof Employee>

    @belongsTo(() => Position, {
        foreignKey: 'departmensId'
    })
    declare positions: BelongsTo<typeof Position>
}