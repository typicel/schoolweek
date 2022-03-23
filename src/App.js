import {useState} from 'react';
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import './App.css'


const Header = () => {
  return (
    <header>
      <h1>Todo List</h1>
    </header>
  );
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
    copy = [...copy, {id: Math.floor(Math.random() * 1000), task: task, date: date, complete: false}];
    setTodoList(copy);
  }

  return(
    <div className="container App">
      <Header />
      <TodoList list={toDoList} handleToggle={handleToggle} handleFilter={handleFilter} />
      <TodoForm addTask={addTask} />
    </div>
  );
}

export default App;
