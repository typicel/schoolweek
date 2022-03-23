import React, {useState} from 'react';
import {Form, Button} from 'react-bootstrap'

const TodoForm = ({addTask}) => {
  
    const [task, setTask] = useState("");
    const [date, setDate] = useState("");
  
    const handleSubmit = (e) => {
      e.preventDefault();
      addTask(task, date);
      setTask("");
      setDate("");
    }
  
    const handleTaskChange = e => {
      setTask(e.target.value);
    }
  
    const handleDateChange = e => {
      setDate(e.target.value);
    }
  
    return(
      <div className="container">
        <div className="d-flex justify-content-center">
          <Form onSubmit={handleSubmit}>
            <div className="d-flex display-inline">
            <Form.Control
              style={{width: '20rem'}}
              type="text"
              value={task}
              onChange={handleTaskChange}
              placeholder="What needs to be done?"/>
            <Form.Control
              type="date"
              style={{width: '16rem'}}
              value={date} 
              onChange={handleDateChange}/>
            </div>
  
              <Button 
              type="submit"
              variant="primary"
              style={{margin: '10px'}}>
                Add Task </Button>
          </Form>
        </div>
      </div>
    );
  
  }

  export default TodoForm;