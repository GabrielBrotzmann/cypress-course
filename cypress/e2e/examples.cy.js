describe("Algunos ejemplos", () => {
  beforeEach(() => {
    cy.visit("/examples");
  });
  it("multi-page testing", () => {
    cy.getDataTest("nav-why-cypress").click();
    cy.location("pathname").should("equal", "/");

    cy.getDataTest("nav-overview").click();
    cy.location("pathname").should("equal", "/overview");
  });
  it("intercept", () => {
    cy.intercept("POST", "http://localhost:3000/examples", {
      body: {
        message: "successfully intercepted request",
      },
    });
    cy.getDataTest("post-button").click();
  });
  it("grudges", () => {
    cy.contains(/add some grudges/i);
    cy.getDataTest("grudge-list").within(() => {
      cy.get("li").should("have.length", 0);
    });
    cy.getDataTest("clear-grudge-button").should("not.exist");

    cy.getDataTest('grudge-list-title').should('have.text', 'Add Some Grudges')

    cy.getDataTest("grudge-input").within(() => {
      cy.get("input").type("some grudge");
    });
    cy.getDataTest("add-grudge-button").click();
    cy.getDataTest("grudge-list").within(() => {
      cy.get("li").should("have.length", 1);
    });
    cy.getDataTest("grudge-input").within(() => {
      cy.get("input").type("Second li");
    });
    cy.getDataTest("add-grudge-button").click();
    cy.getDataTest("grudge-list").within(() => {
      cy.get("li").should("have.length", 2);
      cy.get("li").its(0).should("contains.text", "some grudge");
    });

    cy.getDataTest("grudge-list").within(() => {
      cy.get("li")
        .its(0)
        .within(() => {
          cy.get("button").click();
        });
    });
    cy.getDataTest("grudge-list").within(() => {
      cy.get("li").should("have.length", 1);
    });
    cy.getDataTest("clear-grudge-button").click();
    cy.getDataTest("grudge-list").within(() => {
      cy.get("li").should("have.length", 0);
    });
  });
});
