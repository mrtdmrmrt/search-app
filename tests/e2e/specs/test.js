// https://docs.cypress.io/api/introduction/api.html

describe("Main Page Test", () => {
  it("Visits the app root url", () => {
    cy.visit("/");
    cy.contains("div", "Find in records");
  });
});
