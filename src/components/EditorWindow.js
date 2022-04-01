import React from "react";
import { Modal, Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { FiCalendar, FiClock } from "react-icons/fi";
import MDEditor from "@uiw/react-md-editor";
import { DatePicker, TimeInput } from "@mantine/dates";
import { showNotification } from "@mantine/notifications";

const EditorWindow = ({ todo, editTask, handleEditClose, theme }) => {
  const form = useForm({
    initialValues: {
      newTask: todo.task,
      newDate: todo.date,
      newTime: todo.time,
      newNotes: todo.notes,
    },
  });

  const checkDate = (due, time) => {
    if (due === "" || time === "") return -1; //User shouldn't be able to enter a time without a date

    let date = new Date(due);
    let thetime = new Date(time);

    let dateObj = new Date(date.toDateString() + " " + thetime.toTimeString());
    let today = new Date();

    //Number of seconds between due date and right now
    let timeLeft = (dateObj - today) / 1000;

    let result = timeLeft < 0 ? -2 : 0;
    return result;
  };

  const saveChanges = (e) => {
    e.preventDefault();
    let dateCheck = checkDate(form.values.newDate, form.values.newTime);

    if (form.values.newTask.length <= 0) {
      showNotification({
        title: "❌ Invalid task name",
        disallowClose: false,
        autoClose: 2500,
        message: "Task name cannot be empty",
        color: "red",
      });
    } else if (dateCheck === -2) {
      showNotification({
        title: "❌ Invalid date",
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
      editTask(
        todo.id,
        form.values.newTask,
        form.values.newDate,
        form.values.newNotes,
        form.values.newTime
      );
      handleEditClose();
      showNotification({
        message: "Task Updated ✅",
        autoClose: 2500,
      });
    }
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
      closeOnClickOutside={false}
      closeOnEsc={false}
      onClose={handleEditClose}
    >
      <form onSubmit={saveChanges}>
        <TextInput
          className="my-2"
          placeholder="What needs to be done?"
          {...form.getInputProps("newTask")}
        />

        <Group position="left" className="my-2" grow>
          <DatePicker
            withinPortal={false}
            placeholder="Due"
            icon={<FiCalendar />}
            {...form.getInputProps("newDate")}
          />
          <TimeInput
            icon={<FiClock />}
            format="12"
            {...form.getInputProps("newTime")}
          />
        </Group>

        <div data-color-mode={theme}>
          <div className="wmde-markdown-var"> </div>
          <MDEditor {...form.getInputProps("newNotes")} />
        </div>

        <Group position="right">
          <Button className="my-3" color="green" variant="light" type="submit">
            Save Changes
          </Button>
        </Group>
      </form>
    </Modal>
  );
};

export default EditorWindow;
