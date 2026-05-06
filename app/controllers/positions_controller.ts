import { PositionService } from '#services/position_service'
import { createPositionValidator, updatePositionValidator } from '#validators/position'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class PositionsController {

    constructor(protected positionsService: PositionService) { }

    async index({ response }: HttpContext) {
        const data = await this.positionsService.index()
        return response.ok({
            status: 200,
            message: 'Positions Data Retrieved Successfully',
            data: data
        })
    }

    async show({ params, response }: HttpContext) {
        const id = params.id
        const data = await this.positionsService.show(id)
        return response.ok({
            status: 200,
            message: `Positions ${id} Retrieved Successfully`,
            data: data
        })
    }

    async create({ request, response }: HttpContext) { 
        const payload = await request.validateUsing(createPositionValidator)
        const data = await this.positionsService.create(payload)
        return response.created({
            status: 201,
            message: 'Positions Data Created Successfully',
            data: data
        })
    }

    async update({ params, request, response}: HttpContext) { 
        const id = params.id
        const payload = await request.validateUsing(updatePositionValidator)
        const data = await this.positionsService.update(id, payload)
        return response.ok({
            status: 200,
            message: `Positions ${id} Updated Successfully`,
            data: data
        })
    }

    async destroy({ params, response }: HttpContext) {
        const id = params.id
        await this.positionsService.destroy(id)
        return response.ok({
            status: 200,
            message: `Positions ${id} Deleted Successfully`,
        })
    }
}