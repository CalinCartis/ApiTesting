import { AVATAR_NAME } from '../resources'

export function generateAvatar(method) {
  return method + AVATAR_NAME
}

export function expectProperty(expectedElement, property) {
  expect(expectedElement).to.have.property(property)
}

export function expectPropertyWithValue(expectedElement, property, value) {
  expect(expectedElement).to.have.property(property, value)
}

export function expectPropertiesWithValue(
  expectedElement,
  propertiesWithValue
) {
  propertiesWithValue.map(([property, value]) =>
    expect(expectedElement).to.have.property(property, value)
  )
}

export function urlShouldEqual(givenUrl) {
  cy.url().should('eq', givenUrl)
}
