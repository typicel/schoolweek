import React from "react";
import { Card } from "react-bootstrap";
import "../App.css";

const Todo = ({ todo, handleDelete }) => {
  const handleClick = (e) => {
    e.preventDefault();
    handleDelete(e.target.id);
  };

  // For date formatting lol is there seriously not another way to do this
  let dateObj = new Date(todo.date + " 00:00");
  let today = new Date();
  let timeLeft = (dateObj.getTime() - today.getTime()) / 1000;
  timeLeft = Math.ceil(timeLeft / 86400);

  return (
    <div className="card-style d-flex justify-content-center display-inline m-3">
      <Card
        className={timeLeft <= 1 ? "bg-today" : ""}
        style={{ width: "18rem" }}
      >
        <Card.Header>{todo.id}</Card.Header>
        <Card.Body className="hover">
          <Card.Title>{todo.task}</Card.Title>
          {todo.date ? (
            <Card.Text>
              {dateObj.toDateString()} ({timeLeft} day(s) left)
            </Card.Text>
          ) : null}
        </Card.Body>
        <Card.Footer
          className="hover text-danger"
          onClick={handleClick}
          id={todo.id}
        >
          Done
        </Card.Footer>
      </Card>
    </div>
  );
};

export default Todo;
