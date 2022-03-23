import React from "react";
import Todo from "./Todo";

const TodoList = ({ list, handleDelete }) => {
  if (list) {
    return (
      <div>
        <div className="card-group">
          {list.map((todo) => {
            return <Todo todo={todo} handleDelete={handleDelete} />;
          })}
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};

export default TodoList;
