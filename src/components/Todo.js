import React from 'react'
import {Card} from 'react-bootstrap';

const Todo = ({todo, handleToggle}) => {

    const handleClick = (e) => {
      //alert(e.target.id)
      e.preventDefault();
      handleToggle(e.target.id);
    }
  
    // For date formatting lol is there seriously not another way to do this
    const dateObj = new Date(todo.date);
    // const month = months[dateObj.getMonth()];
    // const day = days[dateObj.getDay()];
    // const date = dateObj.getDate()+1;
  
    return (
      <div className="card-style d-flex justify-content-center display-inline m-3">
        <Card className={todo.complete ? "finished" : ""} style={{width: '18rem'}} >
            <Card.Header>{todo.id}</Card.Header>
            <Card.Body>
                <Card.Title className={todo.complete ? "strike" : ""}>
                {todo.task}
                </Card.Title>
                <Card.Text>
                Due: {dateObj.toDateString()}
                </Card.Text>
            </Card.Body>
            <Card.Footer onClick={handleClick} id={todo.id}>Done</Card.Footer>
          </Card>
      </div>
    );
  }

  export default Todo;