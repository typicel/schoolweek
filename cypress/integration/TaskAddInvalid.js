describe("Adding tasks: Invalid", () => {
  it("User does not enter date and time", () => {
    cy.visit("localhost:3000");

    cy.contains("Add Task").click();

    cy.get(".task-input").type("Hello world!");
    cy.get(".submit-btn").click();

    cy.contains("Error");
    cy.contains("Please enter a date and time");
  });

  it("User enters a date but no time", () => {
    cy.visit("localhost:3000");

    cy.contains("Add Task").click();

    cy.get(".task-input").type("Hello world!");
    cy.get(".date-input").type("3/12/2030");
    cy.get(".submit-btn").click();

    cy.contains("Error");
    cy.contains("Please enter a date and time");
  });

  it("User enters a time but no date", () => {
    cy.visit("localhost:3000");

    cy.contains("Add Task").click();

    cy.get(".task-input").type("Hello world!");

    cy.get(".time-input").type("11:59 PM");
    cy.get(".submit-btn").click();

    cy.contains("Error");
    cy.contains("Please enter a date and time");
  });

  it("User does not enter a task name", () => {
    cy.visit("localhost:3000");

    cy.contains("Add Task").click();
    cy.get(".submit-btn").click();

    cy.contains("Error");
    cy.contains("Task name cannot be empty");
  });
});
