import React from "react";
import { Modal, Button, Group, TextInput, ColorScheme } from "@mantine/core";
import { useForm } from "@mantine/form";
import { FiCalendar, FiClock } from "react-icons/fi";
import MDEditor from "@uiw/react-md-editor";
import { DatePicker, TimeInput } from "@mantine/dates";
import { showNotification } from "@mantine/notifications";
import TodoType from "./interfaces/TodoType";

interface Props {
  todo: TodoType;
  editTask: Function;
  toggleEditMode: Function;
  theme: ColorScheme;
}

const EditorWindow = ({ todo, editTask, toggleEditMode, theme }: Props) => {
  const form = useForm({
    initialValues: {
      newTask: todo.task,
      newDate: new Date(todo.date),
      newTime: new Date(todo.time),
      newNotes: todo.notes,
    },
  });

  const checkDate = (due: Date, time: Date) => {
    let dateObj = new Date(due.toDateString() + " " + time.toTimeString());
    let today = new Date();

    //Number of seconds between due date and right now
    let timeLeft = (dateObj.getTime() - today.getTime()) / 1000;

    let result = timeLeft < 0 ? -2 : 0;
    return result;
  };

  const saveChanges = (e: React.FormEvent<HTMLFormElement>) => {
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
        title: "❌ Error",
        disallowClose: false,
        autoClose: 2500,
        message: "Date should be after today's date",
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
      toggleEditMode();
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
      opened={true}
      title="Edit Task"
      className="modal-styles"
      closeOnClickOutside={false}
      onClose={() => toggleEditMode()}
    >
      <form onSubmit={saveChanges}>
        <TextInput
          className="my-2 task-edit-input"
          placeholder="What needs to be done?"
          {...form.getInputProps("newTask")}
        />

        <Group position="left" className="my-2" grow>
          <DatePicker
            required
            allowFreeInput
            className="date-edit-input"
            placeholder="Due"
            icon={<FiCalendar />}
            {...form.getInputProps("newDate")}
          />
          <TimeInput
            required
            clearable
            className="time-edit-input"
            icon={<FiClock />}
            format="12"
            {...form.getInputProps("newTime")}
          />
        </Group>

        <div data-color-mode={theme}>
          <div className="wmde-markdown-var"> </div>
          <MDEditor
            preview="edit"
            hideToolbar={true}
            {...form.getInputProps("newNotes")}
          />
        </div>

        <Group position="right">
          <Button
            className="my-3 submit-edits"
            color="green"
            variant="light"
            type="submit"
          >
            Save Changes
          </Button>
        </Group>
      </form>
    </Modal>
  );
};

export default EditorWindow;
