import { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import CompletedList from "./components/CompletedList";
import "./App.css";

const Header = ({ type }) => {
  return (
    <header>
      <h1>{type}</h1>
    </header>
  );
};

function App() {
  const [toDoList, setTodoList] = useState(() => {
    const saved = localStorage.getItem("data");
    const inital = JSON.parse(saved);
    return inital || "";
  });

  const handleDelete = (id) => {
    const newArr = toDoList.filter((task) => task.id != id);
    setTodoList(newArr);
  };

  const addTask = (task, date) => {
    if (task == "") {
      alert("Please enter a task name");
      return;
    }
    let dateObj = new Date(date + " 00:00");
    let today = new Date();
    let timeLeft = (dateObj.getTime() - today.getTime()) / 1000;
    timeLeft = Math.ceil(timeLeft / 86400);

    if (timeLeft < 0) {
      alert("Invalid date");
      return;
    }

    let copy = [...toDoList];
    copy = [
      ...copy,
      {
        id: Math.floor(Math.random() * 1000),
        task: task,
        date: date,
        completed: false,
      },
    ];

    copy = copy.sort((task1, task2) => {
      return new Date(task1.date) - new Date(task2.date);
    });

    setTodoList(copy);
  };

  //use local storage
  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(toDoList));
    //localStorage.setItem("completed", JSON.stringify(completedList));
  });

  return (
    <div className="container App">
      <Header type="Todo List" />
      <TodoList list={toDoList} handleDelete={handleDelete} />
      <TodoForm addTask={addTask} />
      {/* <Header type="Completed Tasks" /> */}
      {/* <CompletedList compList={completedList} /> */}
    </div>
  );
}

export default App;
