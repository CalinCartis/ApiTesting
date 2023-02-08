import { todosEndpoint } from '../utils'

describe('get all todo endpoints', () => {
  it('should get a valid response', () => {
    todosEndpoint.validateQueryHeader()
    todosEndpoint.expectQueryHaveStatus(200)
  })

  it('should response length be correct', () => {
    todosEndpoint.getAllQueryExpectLength(150)
  })

  it('should response length not be correct', () => {
    todosEndpoint.getAllQueryExpectLength(151, true)
  })
})
