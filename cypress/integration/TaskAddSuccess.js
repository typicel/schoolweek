describe("Adding tasks: Success", () => {
  it("User enters all fields correctly and adds a task", () => {
    cy.visit("localhost:3000");

    cy.contains("Add Task").click();

    cy.get(".task-input").type("Task 1");
    cy.get(".date-input").type("3/12/2030");
    cy.get(".time-input").type("11:59 PM");
    cy.get(".submit-btn").click();

    cy.contains("Task 1");
  });

  it("User reloads page and task added before is stil there", () => {
    cy.visit("localhost:3000");
    cy.reload();
    cy.contains("Task 1");
  });

  it("User can click on task and info about it will show up", () => {
    cy.visit("localhost:3000");

    cy.get(".todo-info").click();
    cy.contains("No notes to display");
  });
});
