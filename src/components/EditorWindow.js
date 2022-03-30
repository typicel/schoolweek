import React, { useState } from "react";
import { FormControl, Form } from "react-bootstrap";
import { Modal, Button, Group } from "@mantine/core";
import MDEditor from "@uiw/react-md-editor";

const EditorWindow = ({ todo, editTask, handleEditClose, theme }) => {
  const [newTask, setNewTask] = useState(todo.task);
  const [newDate, setNewDate] = useState(todo.date);
  const [newNotes, setNewNotes] = useState(todo.notes);
  const [newTime, setNewTime] = useState(todo.time);

  const checkDate = (due, time) => {
    if (due === "" && time !== "") return -1; //User shouldn't be able to enter a time without a date

    let formatDate = time === "" ? due : due + "T" + time;

    let dateObj = new Date(formatDate);
    let today = new Date();
    let timeLeft = Math.ceil((dateObj.getTime() - today.getTime()) / 86400000);

    let result = timeLeft < 0 ? -1 : 0;
    return result;
  };

  const saveChanges = () => {
    if (checkDate(newDate, newTime) === -1) {
      alert("Please enter a valid date");
      return;
    } else if (newTask.length <= 0) {
      alert("Please enter a task name");
      return;
    }

    editTask(todo.id, newTask, newDate, newNotes, newTime);
    handleEditClose();
  };

  return (
    <Modal
      classNames={{
        modal: "modal-styles",
        title: "title-bold",
      }}
      size="1000px"
      opened="true"
      title="Edit Task"
      className="modal-styles"
      onClose={handleEditClose}
    >
      <Form>
        <FormControl
          className="dark-input my-2"
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <div className="d-flex display-inline">
          <FormControl
            className="dark-input mx-2"
            type="date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
          />
          <FormControl
            className="dark-input mx-2"
            type="time"
            value={newTime}
            onChange={(e) => setNewTime(e.target.value)}
          />
        </div>

        <div className="my-3" data-color-mode={theme}>
          <div className="wmde-markdown-var"> </div>
          <MDEditor height="400" value={newNotes} onChange={setNewNotes} />
        </div>
      </Form>
      <Group position="right">
        <Button variant="primary" onClick={saveChanges}>
          Save
        </Button>
      </Group>
    </Modal>
  );
};

export default EditorWindow;
