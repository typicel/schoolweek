import React from "react";
import Todo from "./Todo";

const TodoList = ({ list, handleDelete, editTask, theme }) => {
  return (
    <div>
      {list.length > 0 ? (
        <div className="card-group">
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
        </div>
      ) : (
        <div className="m-3 py-5">
          <h4>No tasks to display</h4>
        </div>
      )}
    </div>
  );
};

export default TodoList;
