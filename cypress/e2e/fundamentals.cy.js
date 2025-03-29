describe('template spec', () => {

  beforeEach(() => {
    cy.visit('/fundamentals')
  })

  it('Page Load', () => {
    //Comando custom para evitar reescribir
    cy.getDataTest('fundamentals-header').should('contain.text','Testing Fundamentals')
    //cy.get('[data-test="fundamentals-header"]').should('contain.text','Testing Fundamentals')
  })

  it('Accordion works correctly', () => {
    cy.contains(/Your tests will exist in a describe block/i).should('not.be.visible')
    cy.get('[data-test="accordion-item-1"] div[role="button"]').click()
    cy.contains(/Your tests will exist in a describe block/i).should('be.visible')
    cy.get('[data-test="accordion-item-1"] div[role="button"]').click()
     cy.contains(/Your tests will exist in a describe block/i).should('not.be.visible')
  })

})