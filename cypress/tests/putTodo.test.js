import { todosEndpoint } from '../utils'
import { mockData } from '../fixtures'
import { METHODS } from '../resources'

describe('put todo endpoints', () => {
  it('should check todo put header and status when successfully', () => {
    mockData(todo => {
      todosEndpoint.validateMutationHeader({
        body: {
          completed: todo.todoForPut.completed,
          userId: todo.todoForPut.userId,
        },
        id: todo.todoForPost.id,
        method: METHODS.PUT,
      })
      todosEndpoint.expectMutationHaveStatus({
        status: 200,
        id: todo.todoForPost.id,
        body: {
          completed: todo.todoForPut.completed,
          userId: todo.todoForPut.userId,
        },
        method: METHODS.PUT,
      })
    })
  })

  it('should put a todo successfully', () => {
    mockData(todo => {
      todosEndpoint.expectSuccessfullyPut(todo.todoForPut.id, {
        completed: todo.todoForPut.completed,
        userId: todo.todoForPut.userId,
      })
    })
  })
})
