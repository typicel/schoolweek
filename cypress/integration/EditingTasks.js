describe("Testing editing tasks", () => {
  it("User can add a task, click on it, edit the task name, and changes will be saved", () => {
    cy.visit("localhost:3000");

    cy.contains("Add Task").click();

    cy.get(".task-input").type("Task 1");
    cy.get(".date-input").type("3/12/2030");
    cy.get(".time-input").type("1159PM");
    cy.get(".submit-btn").click();

    cy.contains("Task 1");
    cy.wait(500);

    cy.get(".todo-info").click();
    cy.contains("No notes to display");

    cy.get(".edit-btn").click();
    cy.get(".task-edit-input").type(" edited!!");
    cy.get(".submit-edits").click();

    cy.contains("Task 1 edited!!");
  });

  it("User can't edit date to be before today", () => {
    cy.visit("localhost:3000");

    cy.get(".todo-info").click();
    cy.contains("No notes to display");

    cy.get(".edit-btn").click();
    cy.get(".date-edit-input").clear().type("2/12/1990");
    cy.get(".submit-edits").click();

    cy.contains("Error");
    cy.contains("Date should be after today's date");
  });

  // it("Add task, edit task date and time, refresh page, check if date and time are there", () => {
  //   cy.visit("localhost:3000");

  //   cy.contains("Add Task").click();
  //   cy.get(".task-input").type("Edit Task Test 2");
  //   cy.get(".date-input").type("3/12/2030");
  //   cy.get(".time-input").type("1159 PM");
  //   cy.get(".submit-btn").click();

  //   cy.reload();

  //   cy.get(".todo-info").click();

  //   cy.get(".edit-btn").click();
  //   cy.get(".date-edit-input").clear().type("4/4/2040");
  //   cy.get(".time-edit-input").type("0444 PM");
  //   cy.get(".submit-edits").click();

  //   cy.reload();

  //   cy.get(".todo-info").click();
  //   cy.get(".edit-btn").click();

  //   cy.get(".date-edit-input").should("have.value", "April 4, 2040");
  //   cy.get(".time-edit-input").should("have.value", "04:44 PM");
  // });
});
