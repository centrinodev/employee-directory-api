/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { controllers } from '#generated/controllers'

router
  .group(() => {
    // GROUP ROUTE DEPARTMENTS
    router
      .group(() => {
        router.get('/', [controllers.Departments, 'index'])
        router.get('/{id}', [controllers.Departments, 'show'])
        router.post('/', [controllers.Departments, 'create'])
        router.put('/{id}', [controllers.Departments, 'update'])
        router.delete('/{id}', [controllers.Departments, 'destroy'])
      }).prefix('departments').as('departments')

    // GROUP ROUTE EMPLOYEES
    router.group(() => {
      router.get('/', [controllers.Employees, 'index'])
      router.get('/statistic', [controllers.Employees, 'statisticStatusEmployee'])
      router.get('/{code}', [controllers.Employees, 'show'])
      router.post('/', [controllers.Employees, 'create'])
      router.put('/{code}', [controllers.Employees, 'update'])
      router.delete('/{code}', [controllers.Employees, 'destroy'])
    }).prefix('employees').as('employees')

    // GROUP ROUTE POSITIONS
    router.group(() => {
      router.get('/', [controllers.Positions, 'index'])
      router.get('/{id}', [controllers.Positions, 'show'])
      router.post('/', [controllers.Positions, 'create'])
      router.put('/{id}', [controllers.Positions, 'update'])
      router.delete('/{id}', [controllers.Positions, 'destroy'])
    }).prefix('positions').as('positions')

  })
  .prefix('/api/v1')
