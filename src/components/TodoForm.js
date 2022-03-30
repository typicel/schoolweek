import React from "react";
import MDEditor from "@uiw/react-md-editor";
import { showNotification } from "@mantine/notifications";
import { useForm } from "@mantine/form";
import { Button, Container, Grid, Group, TextInput } from "@mantine/core";
import { DatePicker } from "@mantine/dates";

const TodoForm = ({ addTask, theme, togglePopover }) => {
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
      togglePopover(false);
    }
  };

  let filled = theme === "light" ? "light" : "filled";

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        className="my-2"
        placeholder="What needs to be done?"
        {...form.getInputProps("task")}
      />

      <Group position="left" className="my-2" grow>
        <DatePicker
          withinPortal={false}
          placeholder="Due"
          {...form.getInputProps("date")}
        />
        <input
          type="time"
          className="form-control dark-input"
          {...form.getInputProps("time")}
        />
      </Group>
      <Button color="green" variant={filled} type="submit">
        Add
      </Button>
    </form>
  );
};

export default TodoForm;
