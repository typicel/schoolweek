import React from "react";
import MDEditor from "@uiw/react-md-editor";
import { showNotification } from "@mantine/notifications";
import { useForm } from "@mantine/form";
import { Button, Container, Grid } from "@mantine/core";

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

    if (form.values.task.length <= 0) {
      showNotification({
        title: "❌ Invalid task name",
        id: "hello-there",
        disallowClose: false,
        autoClose: 2500,
        message: "Task name cannot be empty",
        color: "red",
        loading: false,
      });
    } else if (checkDate(form.values.date, form.values.time) === -1) {
      showNotification({
        title: "❌ Invalid date",
        id: "hello-there",
        disallowClose: false,
        autoClose: 2500,
        message: "Date should be after toady's date",
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

  let filled = theme === "light" ? "light" : "filled";

  return (
    <Container size="70%">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control dark-input my-3"
          placeholder="What needs to be done?"
          {...form.getInputProps("task")}
        />

        <Grid>
          <Grid.Col span={6}>
            <input
              type="date"
              className="form-control dark-input"
              {...form.getInputProps("date")}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <input
              type="time"
              className="form-control dark-input"
              {...form.getInputProps("time")}
            />
          </Grid.Col>
        </Grid>

        <div className="my-3" data-color-mode={theme}>
          <div className="wmde-markdown-var"> </div>
          <MDEditor width="400" height="400" {...form.getInputProps("notes")} />
        </div>

        <Button color="blue" variant={filled} type="submit">
          Add
        </Button>
      </form>
    </Container>
  );
};

export default TodoForm;
