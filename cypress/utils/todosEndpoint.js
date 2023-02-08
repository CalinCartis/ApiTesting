import { MAIN_URL, METHODS, HEADER_ATTRIBURES, NOT_FOUND } from '../resources'
import {
  generateAvatar,
  expectPropertyWithValue,
  expectPropertiesWithValue,
  expectProperty,
} from '../helpers'

export class TodosEndpoint {
  expectErrorMessage({
    id = undefined,
    body = undefined,
    metod = METHODS.GET,
  }) {
    const avatar = generateAvatar(METHODS.GET)
    cy.request({
      method: metod,
      url: id ? MAIN_URL + '/' + id : MAIN_URL,
      body: body,
      failOnStatusCode: false,
    }).as(avatar)
    cy.get(`@${avatar}`).then(resp => {
      expect(resp.body.message).to.eq(NOT_FOUND)
    })
  }

  validateQueryHeader(id = undefined) {
    const avatar = generateAvatar(METHODS.GET)
    cy.request(METHODS.GET, id ? MAIN_URL + '/' + id : MAIN_URL).as(avatar)
    cy.get(`@${avatar}`).then(resp => {
      expectPropertyWithValue(
        resp.headers,
        HEADER_ATTRIBURES.CONTENT_TYPE,
        HEADER_ATTRIBURES.APPLICATION_TYPE
      )
    })
  }

  validateMutationHeader({ body = '', method = METHODS.POST, id }) {
    const avatar = generateAvatar(method)
    cy.request(
      method,
      id
        ? (method === METHODS.POST ? `${MAIN_URL}/add` : `${MAIN_URL}/`) + id
        : method === METHODS.POST
        ? `${MAIN_URL}/add`
        : `${MAIN_URL}/`,
      body
    ).as(avatar)
    cy.get(`@${avatar}`).then(resp => {
      expectPropertyWithValue(
        resp.headers,
        HEADER_ATTRIBURES.CONTENT_TYPE,
        HEADER_ATTRIBURES.APPLICATION_TYPE
      )
    })
  }

  expectQueryHaveStatus(status = 200, id = undefined) {
    const avatar = generateAvatar(METHODS.GET)
    cy.request({
      method: METHODS.GET,
      url: id ? MAIN_URL + '/' + id : MAIN_URL,
      failOnStatusCode: false,
    }).as(avatar)
    cy.get(`@${avatar}`).then(resp => {
      expect(resp.status).to.eq(status)
    })
  }

  expectMutationHaveStatus({
    status = 200,
    method = METHODS.POST,
    body = undefined,
    id = undefined,
  }) {
    const avatar = generateAvatar(method)
    const condition = !!(method === METHODS.POST)
    cy.request({
      method: method,
      url: id
        ? (condition ? `${MAIN_URL}/add` : `${MAIN_URL}/`) + id
        : condition
        ? `${MAIN_URL}/add`
        : `${MAIN_URL}/`,
      failOnStatusCode: false,
      body: body,
    }).as(avatar)
    cy.get(`@${avatar}`).then(resp => {
      expect(resp.status).to.eq(status)
    })
  }

  expectSuccessfullyPost(body) {
    const avatar = generateAvatar(METHODS.POST)
    cy.request(METHODS.POST, `${MAIN_URL}/add`, body).as(avatar)
    cy.get(`@${avatar}`).then(resp => {
      expect(resp.status).to.eq(200)
    })
  }

  expectSuccessfullyPut(id, body) {
    const avatar = generateAvatar(METHODS.PUT)
    cy.request(METHODS.PUT, `${MAIN_URL}/` + id, body).as(avatar)
    cy.get(`@${avatar}`).then(resp => {
      expect(resp.status).to.eq(200)
      expectPropertiesWithValue(resp.body.todos, Object.entries(body))
    })
  }

  expectSuccessfullyPatch(id, body) {
    const avatar = generateAvatar(METHODS.PATCH)
    cy.request(METHODS.PATCH, MAIN_URL + '/' + id, body).as(avatar)
    cy.get(`@${avatar}`).then(resp => {
      expect(resp.status).to.eq(200)
      expectPropertiesWithValue(resp.body.todos, Object.entries(body))
    })
  }

  expectSuccessfullyDelete(id) {
    const avatar = generateAvatar(METHODS.DELETE)
    cy.request(METHODS.DELETE, MAIN_URL + '/' + id).as(avatar)
    cy.get(`@${avatar}`).then(resp => {
      expect(resp.status).to.eq(200)
    })
  }

  expectGetByIdHaveProperty(id, property) {
    const avatar = generateAvatar(METHODS.GET)
    cy.request(METHODS.GET, MAIN_URL + '/' + id).as(avatar)
    cy.get(`@${avatar}`).then(resp => {
      expectProperty(resp.body, property)
    })
  }

  responseLengthGreaterThan0() {
    const avatar = generateAvatar(METHODS.GET)
    cy.request(METHODS.GET, MAIN_URL).as(avatar)
    cy.get(`@${avatar}`).then(resp => {
      expect(resp.body.todos.length).to.be.greaterThan(0)
    })
  }

  getAllQueryExpectLength(length, toNotEqual = false) {
    const avatar = generateAvatar(METHODS.GET)
    cy.request(METHODS.GET, MAIN_URL).as(avatar)
    cy.get(`@${avatar}`).then(resp => {
      toNotEqual
        ? expect(resp.body.total).to.not.eq(length)
        : expect(resp.body.total).to.eq(length)
    })
  }

  expectGetByIdResponseNotNull(id) {
    const avatar = generateAvatar(METHODS.GET)
    cy.request(METHODS.GET, MAIN_URL + '/' + id).as(avatar)
    cy.get(`@${avatar}`).then(resp => {
      expect(resp.body).not.to.eq({} || null || undefined)
    })
  }

  expectGetByIdNullResponse(id) {
    const avatar = generateAvatar(METHODS.GET)
    cy.request(METHODS.GET, MAIN_URL + '/' + id).as(avatar)
    cy.get(`@${avatar}`).then(resp => {
      expect(resp.body.todos).to.be.null()
    })
  }
}
