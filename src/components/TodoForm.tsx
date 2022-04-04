import React from "react";
import { showNotification } from "@mantine/notifications";
import { useForm } from "@mantine/form";
import { Button, Group, TextInput } from "@mantine/core";
import { DatePicker, TimeInput } from "@mantine/dates";
import { FiCalendar, FiClock } from "react-icons/fi";

interface Props {
  addTask: Function;
  togglePopover: Function;
}

const TodoForm = ({ addTask, togglePopover }: Props) => {
  const form = useForm({
    initialValues: {
      task: "",
      date: "",
      time: "",
      notes: "",
    },
  });

  const checkDate = (due: string, time: string) => {
    if (due === "" || time === "") return -1; //User shouldn't be able to enter a time without a date

    let date = new Date(due);
    let thetime = new Date(time);

    let dateObj = new Date(date.toDateString() + " " + thetime.toTimeString());
    let today = new Date();

    //Number of seconds between due date and right now
    let timeLeft = (dateObj.getTime() - today.getTime()) / 1000;

    let result = timeLeft < 0 ? -2 : 0;
    return result;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let dateCheck = checkDate(form.values.date, form.values.time);

    if (form.values.task.length <= 0) {
      showNotification({
        title: "❌ Invalid task name",
        id: "hello-there",
        disallowClose: false,
        autoClose: 2500,
        message: "Task name cannot be empty",
        color: "red",
      });
      return;
    } else if (dateCheck === -2) {
      showNotification({
        title: "❌ Invalid date",
        id: "hello-there",
        disallowClose: false,
        autoClose: 2500,
        message: "Date should be after toady's date",
        color: "red",
      });
    } else if (dateCheck === -1) {
      showNotification({
        title: "❌ Invalid date",
        id: "hello-there",
        disallowClose: false,
        autoClose: 2500,
        message: "Please enter a date and time",
        color: "red",
      });
    } else {
      addTask(
        form.values.task,
        form.values.date,
        form.values.time,
        form.values.notes
      );

      togglePopover(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        className="my-2"
        placeholder="What needs to be done?"
        {...form.getInputProps("task")}
      />

      <Group position="left" className="my-2" grow>
        <DatePicker
          required={true}
          withinPortal={false}
          placeholder="Due"
          icon={<FiCalendar />}
          {...form.getInputProps("date")}
        />
        <TimeInput
          required={true}
          icon={<FiClock />}
          format="12"
          {...form.getInputProps("time")}
        />
      </Group>
      <Button color="green" variant="light" type="submit">
        Add
      </Button>
    </form>
  );
};

export default TodoForm;
