import { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import Footer from "./components/Footer";
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

  console.log("from storage: " + localStorage.getItem("theme"));

  const [theme, toggleTheme] = useDarkMode();

  console.log("Current state: " + theme);

  const editTask = (id, task, date, notes, time) => {
    let editcheck = toDoList.find((element) => element.id === id);

    if (editcheck) {
      toDoList.map((element) => {
        if (element.id === id) {
          element.task = task;
          element.date = date;
          element.time = time;
          element.notes = notes;
          localStorage.setItem("data", JSON.stringify(toDoList)); // update local storage
        }
        return null;
      });
    }
  };

  const handleDelete = (id) => {
    const newArr = toDoList.filter((task) => {
      return task.id !== parseInt(id);
    });
    setTodoList(newArr);
  };

  const addTask = (task, date, time, notes) => {
    let copy = [...toDoList];
    copy = [
      ...copy,
      {
        id: Math.floor(Math.random() * 1000),
        task: task,
        date: date,
        time: time,
        notes: notes,
      },
    ];

    copy = copy.sort((task1, task2) => {
      return new Date(task1.date) - new Date(task2.date);
    });

    setTodoList(copy);
  };

  // update local storage when new task is added
  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(toDoList));
  });

  const themeMode = theme === true ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={themeMode}>
      <GlobalStyles />
      <ThemeToggle toggleTheme={toggleTheme} />
      <div className="container App">
        <Header type=" Schoolweek" />
        <TodoList
          list={toDoList}
          handleDelete={handleDelete}
          editTask={editTask}
          theme={theme}
        />
        <TodoForm addTask={addTask} theme={theme} />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
