import { todosEndpoint } from '../utils'
import { mockData } from '../fixtures'

describe('get quote by id endpoints', () => {
  it('should get a valid response', () => {
    mockData(todo => {
      todosEndpoint.validateQueryHeader(todo.todoForGetById.id)
      todosEndpoint.expectQueryHaveStatus(200, todo.todoForGetById.id)
    })
  })

  it('should have author property in response', () => {
    mockData(todo => {
      todosEndpoint.expectGetByIdHaveProperty(
        todo.todoForGetById.id,
        'completed'
      )
    })
  })

  it('should get by id response not null', () => {
    mockData(todo => {
      todosEndpoint.expectGetByIdResponseNotNull(todo.todoForGetById.id)
    })
  })

  it('should get a 404 status and null response', () => {
    todosEndpoint.expectQueryHaveStatus(404, '160')
  })
})
