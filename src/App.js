import { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import useDarkMode from "./components/styles/useDarkMode";
import ThemeToggle from "./components/ThemeToggle";
import { ThemeProvider } from "styled-components";
import {
  GlobalStyles,
  lightTheme,
  darkTheme,
} from "./components/styles/globalStyles";
import "./App.css";

const Header = ({ type }) => {
  return (
    <header>
      <h1>
        <span role="img" aria-label="pencil">
          ✏️
        </span>
        {type}
      </h1>
    </header>
  );
};

function App() {
  const [toDoList, setTodoList] = useState(() => {
    const saved = localStorage.getItem("data");
    const inital = JSON.parse(saved);
    return inital || "";
  });

  // let initTheme = localStorage.getItem("theme");
  // if (initTheme === undefined) {
  //   initTheme = "light";
  // }

  const [theme, toggleTheme] = useDarkMode("light");

  const editTask = (id, task, date, notes) => {
    let editcheck = toDoList.find((element) => element.id == id);

    if (editcheck) {
      toDoList.map((element) => {
        if (element.id == id) {
          element.task = task;
          element.date = date;
          element.notes = notes;
        }
      });

      return;
    }
  };

  const handleDelete = (id) => {
    const newArr = toDoList.filter((task) => task.id != id);
    setTodoList(newArr);
  };

  const addTask = (task, date, notes) => {
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
        notes: notes,
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
  });

  const themeMode = theme === "light" ? lightTheme : darkTheme;

  return (
    <div className="container App">
      <ThemeProvider theme={themeMode}>
        <GlobalStyles />
        {/* <ThemeToggle theme={theme} toggleTheme={toggleTheme} /> */}
        <br></br>
        <Header type=" Schoolweek" />
        <TodoList
          list={toDoList}
          handleDelete={handleDelete}
          editTask={editTask}
        />
        <TodoForm addTask={addTask} />
      </ThemeProvider>
    </div>
  );
}

export default App;
