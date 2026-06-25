import Employee from "#models/employee";
import { randomInt } from "crypto";
import { DateTime } from "luxon";

type employeeType = {
  departmensId: number,
  positionsId: number,
  employeeCode?: string,
  fullName: string,
  email: string,
  phone: string,
  hireDate: Date | DateTime,
  status?: string
}

export class EmployeeService {

  async index(departmen?: string, status?: string, query?: string) {
    const data = Employee.query().preload('departmen').preload('position')
    if (query) {
      data.where((builder) => {
        builder.whereILike('full_name', `%${query}%`).orWhereILike('email', `%${query}%`)
      })
    }

    if (status) {
      data.where('status', status)
    }

    if (departmen) {
      data.whereHas('departmen', (departmenQuery) => {
        departmenQuery.where('departmen_name', departmen)
      })
    }

    return await data
  }

    async statisticStatusEmployee(departmen?: string) {
    const query = Employee.query().select('status').count('* as total').groupBy('status')

    if (departmen) {
      query.whereHas('departmen', (db) => db.where('departmen_name', departmen))
    }

    const results = await query

    const getCount = (status: string) => 
      Number(results.find(r => r.status === status)?.$extras.total) || 0

    return {
      departmen: departmen || 'Semua Departemen/Divisi',
      active: getCount('active'),
      inactive: getCount('inactive')
    }
  }

  async show(code: string) {
    return await Employee.findByOrFail('employee_code', code)
  }

  async create(payload: employeeType) {
    const employeeCode = 'EMP' + randomInt(100000, 999999)

    let hireDate = payload.hireDate
    if (hireDate instanceof Date) {
      hireDate = DateTime.fromJSDate(hireDate)
    }

    return await Employee.create({
      ...payload,
      employeeCode,
      hireDate
    })
  }

  async update(code: string, payload: employeeType) {
    const data = await Employee.findByOrFail('employee_code', code)

    let hireDate = payload.hireDate
    if (hireDate instanceof Date) {
      hireDate = DateTime.fromJSDate(hireDate)
    }

    return await data.merge({ ...payload, hireDate }).save()
  }

  async destroy(code: string) {
    const data = await Employee.findByOrFail('employee_code', code)
    return await data.delete()
  }
}