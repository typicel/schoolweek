import {Card, Button, Form} from 'react-bootstrap'
import data from './data.json'
import {useState} from 'react';
import './App.css'

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

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

const Todo = ({todo, handleToggle}) => {

  const handleClick = (e) => {
    e.preventDefault();
    handleToggle(e.target.id);
  }

  const dateObj = new Date(todo.date);

  const month = months[dateObj.getMonth()];
  const day = days[dateObj.getDay()];
  const date = dateObj.getDate()+1;

  // return (
  //   <div
  //   id={todo.id}
  //   name="todo"
  //   className={todo.complete ? "strike" : ""}
  //   onClick={handleClick}
  //   >
  //     {todo.id}.{todo.task} due on {day}, {month} {date}
  //     {/* {todo.id}. {todo.task} due on {dateObj.toDateString()} */}
  //   </div>
  // );

  return (
    <div className="d-flex justify-content-center display-inline">
      <Card style={{width: '18rem'}}>
        <Card.Text className={todo.complete ? "strike" : ""}>
          {todo.task}
        </Card.Text>
      </Card>
    
    </div>
  );
}

const Header = () => {
  return (
    <header>
      <h1>Sproom List</h1>
    </header>
  );
}

const TodoList = ({list, handleToggle, handleFilter}) => {
  return(
    <div>
      {list.map(todo => {
        return (
          <Todo todo={todo} handleToggle={handleToggle} />
        )
      })}
      <Button
        variant="danger"
        style={{margin: '20px'}}
        onClick={handleFilter}
      >Clear Finished Tasks </Button>
    </div>
  )
}

function App() {

  const [toDoList, setTodoList] = useState([]);

  const handleToggle = (id) => {
    let mapped = toDoList.map(task => {
      return task.id == id ? {...task, complete: !task.complete} : {...task};
    })
    setTodoList(mapped);
  }

  const handleFilter = () => {
    let filtered = toDoList.filter(task => {
      return !task.complete;
    });
    setTodoList(filtered);
  }

  const addTask = (task, date) => {
    let copy = [...toDoList];
    copy = [...copy, {id: toDoList.length + 1, task: task, date: date, complete: false}];
    setTodoList(copy);
  }

  return(
    <div className="App">
      <Header />
      <TodoList list={toDoList} handleToggle={handleToggle} handleFilter={handleFilter} />
      <TodoForm addTask={addTask} />
    </div>
    
  );
  
}

export default App;
