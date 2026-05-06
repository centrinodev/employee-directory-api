import { EmployeeService } from '#services/employee_service'
import { createEmployeeValidator, updateEmployeeValidator } from '#validators/employee'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class EmployeesController {

    constructor(protected employeeService: EmployeeService) { }

    async index({ response }: HttpContext) {
        const data = await this.employeeService.index()
        return response.ok({
            status: 200,
            message: 'Employee Data Retrieved Successfully',
            data: data
        })
    }

    async show({response, params}:HttpContext){
        const code = params.code
        const data = await this.employeeService.show(code)
        return response.ok({
            status: 200,
            message: `Employee ${code} Retrieved Successfully`,
            data: data
        })
    }

    async post({ request, response }: HttpContext) {
        const payload = await request.validateUsing(createEmployeeValidator)
        const data = await this.employeeService.create(payload)
        return response.created({
            status: 201,
            message: 'Employee Created Successfully',
            data: data
        })
    }

    async update({ request, response, params }: HttpContext) {
        const code = params.code
        const payload = await request.validateUsing(updateEmployeeValidator, {
            meta: {
                code: code
            }
        })
        const data = await this.employeeService.update(code, payload)
        return response.ok({
            status: 200,
            message: `Employee ${code} Updated Successfully`,
            data: data
        })
    }

    async destroy({response, params}: HttpContext){
        const code = params.code
        await this.employeeService.destroy(code)
        return response.ok({
            status: 200,
            message: `Employee ${code} Deleted Successfully`,
            data: {}
        })
    }
}