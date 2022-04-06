describe("user can change theme", () => {
  it("User can change theme to dark theme", () => {
    cy.visit("localhost:3000");
    cy.get(".theme-switch").click();
    cy.get(".app-bg").should("have.css", "background-color", "rgb(26, 27, 30)");
  });

  it("User can change theme from dark, back to light", () => {
    cy.visit("localhost:3000");
    cy.get(".theme-switch").click();
    cy.get(".theme-switch").click();
    cy.get(".app-bg").should(
      "have.css",
      "background-color",
      "rgb(255, 255, 255)"
    );
  });

  it("User can change theme to dark, refresh, and theme will still be dark", () => {
    cy.visit("localhost:3000");
    cy.get(".theme-switch").click();
    cy.reload();
    cy.get(".app-bg").should("have.css", "background-color", "rgb(26, 27, 30)");
  });
});
