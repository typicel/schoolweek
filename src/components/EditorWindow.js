import React, { useState } from "react";
import { Modal, Button, FormControl, Form } from "react-bootstrap";
import MDEditor from "@uiw/react-md-editor";

const EditorWindow = ({ todo, editTask, handleEditClose, theme }) => {
  const [newTask, setNewTask] = useState(todo.task);
  const [newDate, setNewDate] = useState(todo.date);
  const [newNotes, setNewNotes] = useState(todo.notes);

  const checkDate = (due) => {
    let dateObj = new Date(due + " 00:00");
    let today = new Date();
    let timeLeft = (dateObj.getTime() - today.getTime()) / 1000;
    timeLeft = Math.ceil(timeLeft / 86400);

    let result = timeLeft < 0 ? -1 : 0;
    return result;
  };

  const saveChanges = () => {
    if (checkDate(newDate) === -1) {
      alert("Please enter a valid date");
      return;
    } else if (newTask.length <= 0) {
      alert("Please enter a task name");
      return;
    }

    editTask(todo.id, newTask, newDate, newNotes);
    handleEditClose();
  };

  return (
    <Modal size="xl" show="true">
      <Modal.Header>
        <h3>Editing Task</h3>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <div className="d-flex display-inline">
            <FormControl
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <FormControl
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
            />
          </div>

          <div
            className="my-3"
            data-color-mode={theme === true ? "dark" : "light"}
          >
            <div className="wmde-markdown-var"> </div>
            <MDEditor height="400" value={newNotes} onChange={setNewNotes} />
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={saveChanges}>
          Save
        </Button>
        <Button variant="danger" onClick={handleEditClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditorWindow;
