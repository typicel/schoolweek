import React, { useState } from "react";
// import { Form, Button } from "react-bootstrap";
import MDEditor from "@uiw/react-md-editor";
import { showNotification } from "@mantine/notifications";
import { useForm } from "@mantine/form";
import { Button } from "@mantine/core";

const TodoForm = ({ addTask, theme }) => {
  const form = useForm({
    initialValues: {
      task: "",
      date: "",
      time: "",
      notes: "",
    },
  });

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

    if (checkDate(form.values.date, form.values.time) === -1) {
      alert("Please enter a valid date");
    } else if (form.values.task.length <= 0) {
      showNotification({
        id: "hello-there",
        disallowClose: false,
        onClose: () => console.log("unmounted"),
        onOpen: () => console.log("mounted"),
        autoClose: 5000,
        title: "Please enter a task name",
        color: "red",
        loading: false,
      });
    } else {
      addTask(
        form.values.task,
        form.values.date,
        form.values.time,
        form.values.notes
      );
      form.reset();
    }
  };

  return (
    <div className="d-flex justify-content-center m-4">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control dark-input my-3"
          placeholder="What needs to be done?"
          {...form.getInputProps("task")}
        />

        <div className="d-flex display-inline">
          <input
            type="date"
            className="form-control dark-input"
            {...form.getInputProps("date")}
          />
          <input
            type="time"
            className="form-control dark-input"
            {...form.getInputProps("time")}
          />
        </div>

        <div className="my-3" data-color-mode={theme}>
          <div className="wmde-markdown-var"> </div>
          <MDEditor width="400" height="400" {...form.getInputProps("notes")} />
        </div>

        <Button color="blue" variant="light" type="submit">
          Add
        </Button>
      </form>

      {/* <Form className="form-styles" onSubmit={handleSubmit}>
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
      </Form> */}
    </div>
  );
};

export default TodoForm;
