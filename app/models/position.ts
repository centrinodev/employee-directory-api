import { PositionSchema } from '#database/schema'
import { hasMany } from '@adonisjs/lucid/orm'
import Employee from './employee.ts'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class Position extends PositionSchema {
    @hasMany(() => Employee, {
        foreignKey: 'positionsId'
    })
    declare employees: HasMany<typeof Employee>
}