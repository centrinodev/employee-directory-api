import { DepartmenSchema } from '#database/schema'
import { hasMany } from '@adonisjs/lucid/orm'
import Employee from './employee.ts'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class Departmen extends DepartmenSchema {
    @hasMany(() => Employee, {
        foreignKey: 'departmensId'
    })
    declare employees: HasMany<typeof Employee>
}