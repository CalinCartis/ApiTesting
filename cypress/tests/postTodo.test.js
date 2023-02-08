import { todosEndpoint } from '../utils'
import { mockData } from '../fixtures'

describe('post todo endpoints', () => {
  it('should check todo post header and status when successfully', () => {
    mockData(todo => {
      todosEndpoint.validateMutationHeader({
        body: todo.todoForPost,
      })
      todosEndpoint.expectMutationHaveStatus({
        status: 200,
        body: todo.todoForPost,
      })
    })
  })

  it('should post a todo successfully', () => {
    mockData(todo => {
      todosEndpoint.expectSuccessfullyPost(todo.todoForPost)
    })
  })

  it('should have status wrong', () => {
    todosEndpoint.expectMutationHaveStatus({
      status: 400,
      body: {},
    })
  })
})
