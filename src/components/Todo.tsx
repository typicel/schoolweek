import React, { useState } from "react";
import {
  Card,
  Text,
  Badge,
  Group,
  Button,
  Container,
  ColorScheme,
} from "@mantine/core";
import InfoModal from "./InfoModal";
import Moment from "react-moment";
import { showNotification } from "@mantine/notifications";

interface Todo {
  id: number;
  task: string;
  notes: string;
  date: string;
  time: string;
}

interface Props {
  todo: Todo;
  handleDelete: Function;
  editTask: Function;
  theme: ColorScheme;
}

const Todo = ({ todo, handleDelete, editTask, theme }: Props) => {
  // Calls handleDelete from App.tsx when delete button is clicked
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    showNotification({
      message: "Task deleted ✅",
      autoClose: 2500,
    });
    handleDelete(todo.id);
  };

  let time = new Date(todo.time);
  let date = new Date(todo.date);
  let dateObj = new Date(date.toDateString() + " " + time.toTimeString());

  const [modalShown, setShown] = useState(false);

  const toggleInfo = () => setShown(!modalShown);

  return (
    <div>
      {/* only show information when clicked */}
      {modalShown ? (
        <InfoModal
          todo={todo}
          toggleInfo={toggleInfo}
          editTask={editTask}
          theme={theme}
          dateObj={dateObj}
        />
      ) : null}
      <Container className="my-4">
        <Card shadow="sm" style={{ width: "19rem" }}>
          <Group position="apart" onClick={toggleInfo}>
            <Text weight={500}>{todo.task}</Text>
            {todo.date ? (
              <Badge color="purple" variant="light">
                <Moment calendar={true}>{dateObj}</Moment>
              </Badge>
            ) : null}
          </Group>
          <Card.Section>
            <Button
              variant="light"
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
