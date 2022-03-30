import { Popover, Badge } from "@mantine/core";
import React, { useState } from "react";
import TodoForm from "./TodoForm";

const AddTaskButton = ({ addTask, theme }) => {
  const [opened, setOpened] = useState(false);

  const closePopover = () => {
    setOpened(false);
  };

  return (
    <Popover
      opened={opened}
      onClose={() => setOpened(false)}
      position="bottom"
      placement="center"
      withArrow
      trapFocus={false}
      closeOnEscape={false}
      transition="pop-top-left"
      width={260}
      styles={{ body: { pointerEvents: "none" } }}
      target={
        <Badge onClick={() => setOpened(true)}>
          Hover badge to see popover
        </Badge>
      }
    >
      <TodoForm addTask={addTask} theme={theme} closePopover={closePopover} />
    </Popover>
  );
};

export default AddTaskButton;
