Cypress.Screenshot.defaults({
  screenshotOnRunFailure: false,
})

Cypress.Commands.add('isVisible', selector => {
  cy.get(selector).should('be.visible')
})

Cypress.Commands.add('isHidden', selector => {
  cy.get(selector).should('not.exist')
})

Cypress.Commands.add('setResolution', size => {
  if (Cypress._.isArray(size)) {
    cy.viewport(size[0], size[1])
  } else {
    cy.viewport(size)
  }
})

Cypress.Commands.add('printLog', message => {
  cy.task('log', { message })
})

Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})
