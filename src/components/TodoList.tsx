import React from "react";
import { Group, ColorScheme } from "@mantine/core";
import Todo from "./Todo";

interface Props {
  list: Todo[];
  handleDelete: Function;
  editTask: Function;
  theme: ColorScheme;
}

const TodoList = ({ list, handleDelete, editTask, theme }: Props) => {
  return (
    <div style={{ marginBottom: "100px" }}>
      {list.length > 0 ? (
        <Group position="center" spacing="sm">
          {list.map((todo) => {
            return (
              <Todo
                todo={todo}
                handleDelete={handleDelete}
                editTask={editTask}
                theme={theme}
              />
            );
          })}
        </Group>
      ) : (
        <div className="m-3 py-5">
          <h4>No tasks to display</h4>
        </div>
      )}
    </div>
  );
};

export default TodoList;
