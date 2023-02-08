export function mockData(currentFunction) {
  cy.fixture('data.json').then(currentApiData =>
    currentFunction(currentApiData)
  )
}
