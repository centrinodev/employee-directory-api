import { DepartmenService } from '#services/departmen_service';
import { createDepartmenValidator, updateDepartmenValidator } from '#validators/departmen';
import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class DepartmenController {

    constructor(protected departmenService: DepartmenService){}

    async index({ response }: HttpContext) {
        const data = await this.departmenService.index()
        return response.ok({
            status: 200,
            message: 'Departments Data Retrieved Successfully',
            data: data
        })
    }

    async show({ params, response }: HttpContext) {
        const id = Number(params.id)
        const data = await this.departmenService.show(id)
        return response.ok({
            status: 200,
            message: `Department ${id} Retrieved Successfully`,
            data: data
        })
    }

    async create({ response, request }: HttpContext) {
        const payload = await request.validateUsing(createDepartmenValidator)
        const data = await this.departmenService.create(payload)
        return response.created({
            status: 201,
            message: 'Department Created Successfully',
            data: data
        })
    }

    async update({ params, response, request }: HttpContext) {
        const id = Number(params.id)
        const payload = await request.validateUsing(updateDepartmenValidator, { meta: { id } })
        const data = await this.departmenService.update(id, payload)
        return response.ok({
            status: 200,
            message: `Department ${id} Updated Successfully`,
            data: data
        })
    }

    async destroy({ params, response }: HttpContext) {
        const id = Number(params.id)
        await this.departmenService.destroy(id)
        return response.ok({
            status: 200,
            message: 'Department Deleted Successfully'
        })
    }
}