import React, { useState } from "react";
import { Card, Text, Badge, Group, Button, Container } from "@mantine/core";
import InfoModal from "./InfoModal";
import Moment from "react-moment";
import { showNotification } from "@mantine/notifications";

const Todo = ({ todo, handleDelete, editTask, theme }) => {
  const handleClick = (e) => {
    e.preventDefault();
    showNotification({
      message: "Task deleted ✅",
      autoClose: 2500,
    });
    handleDelete(todo.id);
  };
  let time = todo.time === "" ? "00:00" : todo.time;
  let dateObj = new Date(todo.date + "T" + time);

  const [modalShown, setShown] = useState(false);
  const handleShow = () => setShown(true);
  const handleClose = () => setShown(false);

  let filled = theme === "light" ? "light" : "filled";

  return (
    <div>
      {modalShown ? (
        <InfoModal
          todo={todo}
          handleClose={handleClose}
          editTask={editTask}
          theme={theme}
          dateObj={dateObj}
        />
      ) : null}
      <Container className="my-4">
        <Card shadow="sm" className="task-styles">
          <Group position="apart" onClick={handleShow}>
            <Text weight={500}>{todo.task}</Text>
            {todo.date ? (
              <Badge color="purple" variant={filled}>
                <Moment calendar="true">{dateObj}</Moment>
              </Badge>
            ) : null}
          </Group>
          <Card.Section>
            <Button
              variant={filled}
              color="red"
              fullWidth
              style={{ marginTop: 14 }}
              onClick={handleClick}
            >
              Delete
            </Button>
          </Card.Section>
        </Card>
      </Container>
    </div>
  );
};

export default Todo;
