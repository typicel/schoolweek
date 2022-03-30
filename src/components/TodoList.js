import React from "react";
import { Group } from "@mantine/core";
import Todo from "./Todo";

const TodoList = ({ list, handleDelete, editTask, theme }) => {
  return (
    <>
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
    </>
  );
};

export default TodoList;
