import { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import Footer from "./components/Footer";
import ThemeToggle from "./components/ThemeToggle";
import Header from "./components/Header";
import { ThemeProvider } from "styled-components";
import { NotificationsProvider } from "@mantine/notifications";
import { GlobalStyles, lightTheme, darkTheme } from "./styles/globalStyles";
import "./styles/App.css";
import { MantineProvider } from "@mantine/core";

const SaveSettings = (val) => {
  localStorage.setItem("THEME", val);
};

const GetSettings = () => {
  return localStorage.getItem("THEME") ?? "light";
};

function App() {
  useEffect(() => {
    applyTheme(GetSettings());
  }, []);

  const applyTheme = (theme) => {
    setTheme(theme);
    SaveSettings(theme);
  };

  const [toDoList, setTodoList] = useState(() => {
    const saved = localStorage.getItem("data");
    const inital = JSON.parse(saved);
    return inital || "";
  });

  const [theme, setTheme] = useState(GetSettings());

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

  const themeMode = theme === "dark" ? darkTheme : lightTheme;

  return (
    <MantineProvider>
      <NotificationsProvider position="top-left">
        <ThemeProvider theme={themeMode}>
          <GlobalStyles />
          <ThemeToggle applyTheme={applyTheme} theme={theme} />
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
      </NotificationsProvider>
    </MantineProvider>
  );
}

export default App;
