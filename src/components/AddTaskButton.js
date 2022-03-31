import { Popover, Button, Group } from "@mantine/core";
import React, { useState } from "react";
import TodoForm from "./TodoForm";
import "react-tiny-fab/dist/styles.css";

const AddTaskButton = ({ addTask, theme }) => {
  const [opened, setOpened] = useState(false);

  const togglePopover = (val) => {
    setOpened(val);
  };

  return (
    <Group position="center" style={{ marginBottom: "30%" }}>
      <Popover
        opened={opened}
        onClose={() => togglePopover(false)}
        position="bottom"
        placement="center"
        transition="fade"
        shadow="xl"
        width={600}
        target={
          <Button
            color="blue"
            variant="light"
            onClick={() => togglePopover(!opened)}
          >
            Add Task
          </Button>
        }
      >
        <TodoForm
          addTask={addTask}
          theme={theme}
          togglePopover={togglePopover}
        />
      </Popover>
    </Group>
  );
};

export default AddTaskButton;
