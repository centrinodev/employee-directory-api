import { PositionSchema } from '#database/schema'
import { belongsTo } from '@adonisjs/lucid/orm'
import Employee from './employee.ts'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Position extends PositionSchema {
    @belongsTo(() => Employee)
    declare employee: BelongsTo<typeof Employee>
}