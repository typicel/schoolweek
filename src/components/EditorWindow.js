import React from "react";
import { Modal, Button, Group, Grid } from "@mantine/core";
import { useForm } from "@mantine/form";
import MDEditor from "@uiw/react-md-editor";

const EditorWindow = ({ todo, editTask, handleEditClose, theme }) => {
  const form = useForm({
    initialValues: {
      task: todo.task,
      date: todo.date,
      time: todo.time,
      notes: todo.notes,
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

  const saveChanges = () => {
    if (checkDate(form.values.date, form.values.time) === -1) {
      alert("Please enter a valid date");
      return;
    } else if (form.values.task.length <= 0) {
      alert("Please enter a task name");
      return;
    }

    editTask(
      todo.id,
      form.values.task,
      form.values.date,
      form.values.notes,
      form.values.time
    );
    handleEditClose();
  };

  let filled = theme === "light" ? "light" : "filled";

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

        <Group position="right">
          <Button color="blue" variant={filled} type="submit">
            Save
          </Button>
        </Group>
      </form>
    </Modal>
  );
};

export default EditorWindow;
