import Position from "#models/position";

type positionType = {
  positionsName: string,
  departmenId: number
}

export class PositionService {
  
  async index(){
    const data = await Position.query().preload('departmen')
    return data
  }

  async show(id: number){
    const data = await Position.findOrFail(id)
    return data
  }

  async create(payload: positionType){
    return await Position.create(payload)
  }

  async update(id: number, payload: positionType){
    const data = await Position.findOrFail(id)
    return data.merge(payload).save()
  }

  async destroy(id: number){
    const data = await Position.findOrFail(id)
    return data.delete()
  }
}