import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const TodoForm = ({ addTask }) => {
  const [task, setTask] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(task, date);
    setTask("");
    setDate("");
    setNotes("");
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-center m-3">
        <Form onSubmit={handleSubmit}>
          <div className="d-flex display-inline">
            <Form.Control
              style={{ width: "20rem" }}
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="What needs to be done?"
            />
            <Form.Control
              type="date"
              style={{ width: "16rem" }}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <Form.Control
            type="text"
            className="my-3"
            placeholder="Notes (optional)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          ></Form.Control>

          <Button type="submit" variant="primary" style={{ margin: "10px" }}>
            Add Task{" "}
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default TodoForm;
