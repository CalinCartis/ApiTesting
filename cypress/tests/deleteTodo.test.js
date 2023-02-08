import { todosEndpoint } from '../utils'
import { mockData } from '../fixtures'
import { METHODS } from '../resources'

describe('delete todo endpoints', () => {
  it('should check todo delete header and status when successfully', () => {
    mockData(todo => {
      todosEndpoint.validateMutationHeader({
        id: todo.todoForDelete.id,
        method: METHODS.DELETE,
      })
      todosEndpoint.expectMutationHaveStatus({
        status: 200,
        id: todo.todoForDelete.id,
        method: METHODS.DELETE,
      })
    })
  })

  it('should delete a todo successfully', () => {
    mockData(todo => {
      todosEndpoint.expectSuccessfullyDelete(todo.todoForDelete.id)
    })
  })
})
