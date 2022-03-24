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

  const [theme, toggleTheme] = useDarkMode();

  const editTask = (id, task, date, notes) => {
    let editcheck = toDoList.find((element) => element.id === id);

    if (editcheck) {
      toDoList.map((element) => {
        if (element.id === id) {
          element.task = task;
          element.date = date;
          element.notes = notes;
          // return null;
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

  const addTask = (task, date, notes) => {
    if (task === "") {
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

  const themeMode = theme === true ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={themeMode}>
      <GlobalStyles />
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
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
