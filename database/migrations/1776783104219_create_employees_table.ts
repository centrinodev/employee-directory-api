import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'employees'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('departmens_id').unsigned().references('departmens.id').onDelete('CASCADE')
      table.integer('positions_id').unsigned().references('positions.id').onDelete('CASCADE')

      table.string('employee_code', 10).notNullable().unique()
      table.string('full_name', 100).notNullable()
      table.string('email', 100).notNullable().unique()
      table.string('phone', 15).notNullable().unique()
      table.date('hire_date').notNullable()
      table.enum('status', ['active', 'inactive']).defaultTo('active')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}