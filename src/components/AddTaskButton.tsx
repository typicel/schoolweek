import { Popover, Button, Group } from "@mantine/core";
import React, { useState } from "react";
import TodoForm from "./TodoForm";
import "react-tiny-fab/dist/styles.css";

interface Props {
  addTask: Function;
}

const AddTaskButton = ({ addTask }: Props) => {
  const [opened, setOpened] = useState(false);

  const togglePopover = () => {
    setOpened(!opened);
  };

  return (
    <Group position="center" style={{ marginBottom: "30%" }}>
      <Popover
        opened={opened}
        onClose={() => togglePopover()}
        position="bottom"
        placement="center"
        transition="fade"
        shadow="xl"
        width={600}
        closeOnClickOutside={false}
        target={
          <Button color="blue" variant="light" onClick={() => togglePopover()}>
            Add Task
          </Button>
        }
      >
        <TodoForm addTask={addTask} togglePopover={togglePopover} />
      </Popover>
    </Group>
  );
};

export default AddTaskButton;
