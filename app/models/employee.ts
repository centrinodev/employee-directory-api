import { EmployeeSchema } from '#database/schema'
import { belongsTo } from '@adonisjs/lucid/orm'
import Departmen from './departmen.ts'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Position from './position.ts'

export default class Employee extends EmployeeSchema {
    @belongsTo(() => Departmen)
    declare departmen: BelongsTo<typeof Departmen>

    @belongsTo(() => Position)
    declare position: BelongsTo<typeof Position>
}