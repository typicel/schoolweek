import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import MDEditor from "@uiw/react-md-editor";

const TodoForm = ({ addTask, theme }) => {
  const [task, setTask] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");

  const checkDate = (due, time) => {
    if (due === "" && time !== "") return -1; //User shouldn't be able to enter a time without a date

    let formatDate = time === "" ? due : due + "T" + time;

    let dateObj = new Date(formatDate);
    let today = new Date();
    let timeLeft = Math.ceil((dateObj.getTime() - today.getTime()) / 86400000);

    let result = timeLeft < 0 ? -1 : 0;
    return result;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (checkDate(date, time) === -1) {
      alert("Please enter a valid date");
    } else if (task.length <= 0) {
      alert("Please enter a task name");
    } else {
      addTask(task, date, time, notes);
      setTask("");
      setNotes("");
      setDate("");
      setTime("");
    }
  };

  return (
    <div className="d-flex justify-content-center m-3">
      <Form className="form-styles" onSubmit={handleSubmit}>
        <Form.Control
          className="dark-input my-3"
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="What needs to be done?"
        />
        <div className="d-flex display-inline">
          <Form.Control
            className="dark-input"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <Form.Control
            className="dark-input"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>

        <div className="my-3" data-color-mode={theme}>
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
