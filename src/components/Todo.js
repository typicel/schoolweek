import React, { useState } from "react";
import { Card } from "react-bootstrap";
import "../App.css";
import InfoModal from "./InfoModal";
import Moment from "react-moment";

const Todo = ({ todo, handleDelete, editTask, theme }) => {
  const handleClick = (e) => {
    e.preventDefault();
    handleDelete(e.target.id);
  };
  let time = todo.time === "" ? "00:00" : todo.time;

  // For date formatting lol is there seriously not another way to do this
  let dateObj = new Date(todo.date + "T" + time);

  const [modalShown, setShown] = useState(false);
  const handleShow = () => setShown(true);
  const handleClose = () => setShown(false);

  return (
    <div>
      {modalShown ? (
        <InfoModal
          todo={todo}
          handleClose={handleClose}
          editTask={editTask}
          theme={theme}
        />
      ) : null}
      <div className="d-flex justify-content-center display-inline m-3 ">
        <Card className="task-styles">
          <Card.Body className="hover" onClick={handleShow}>
            <Card.Title>{todo.task}</Card.Title>
          </Card.Body>
          {todo.date ? (
            <Card.Text>
              <Moment calendar="true">{dateObj}</Moment>
              {/* {dateObj.toDateString()} ({timeLeft} day(s) left) */}
            </Card.Text>
          ) : null}
          <Card.Footer
            className="delete-btn hover"
            onClick={handleClick}
            id={todo.id}
          >
            Done
          </Card.Footer>
        </Card>
      </div>
    </div>
  );
};

export default Todo;
