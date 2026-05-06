import Departmen from "#models/departmen"

type departmenType = {
  departmenName: string
}

export class DepartmenService {
  async index() { 
    return await Departmen.all()
  }

  async show(id: number) { 
    return await Departmen.findOrFail(id)
  }

  async create(payload: departmenType) { 
    return await Departmen.create(payload)
  }

  async update(id: number, payload: departmenType) { 
    const departmen = await Departmen.findOrFail(id)
    return await departmen.merge(payload).save()
  }

  async destroy(id: number) { 
    const data = await Departmen.findOrFail(id)
    return await data.delete()
  }
}