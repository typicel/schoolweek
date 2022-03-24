import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import MDEditor from "@uiw/react-md-editor";

const TodoForm = ({ addTask, theme }) => {
  const [task, setTask] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(task, date, notes);
    setTask("");
    setDate("");
    setNotes("");
  };

  let mode = theme ? "dark" : "light";

  return (
    <div className="d-flex justify-content-center m-3">
      <Form className="form-styles" onSubmit={handleSubmit}>
        <div className="d-flex display-inline">
          <Form.Control
            className="dark-input"
            style={{ width: "20rem" }}
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="What needs to be done?"
          />
          <Form.Control
            className="dark-input"
            type="date"
            style={{ width: "16rem" }}
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="my-3" data-color-mode={mode}>
          <div className="wmde-markdown-var"> </div>
          <MDEditor
            width="400"
            height="400"
            value={notes}
            onChange={setNotes}
          />
        </div>
        <Button type="submit" variant="primary" style={{ margin: "10px" }}>
          Add Task{" "}
        </Button>
      </Form>
    </div>
  );
};

export default TodoForm;
