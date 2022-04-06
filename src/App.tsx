import React, { useState, useEffect } from "react";
import {
  MantineProvider,
  ColorSchemeProvider,
  Paper,
  ColorScheme,
} from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { useLocalStorageValue } from "@mantine/hooks";

import TodoList from "./components/TodoList";
import Footer from "./components/Footer";
import Header from "./components/Header";
import AddTaskButton from "./components/AddTaskButton";
import ThemeToggle from "./components/ThemeToggle";
import TodoType from './components/interfaces/TodoType';


const App = () => {
  const [toDoList, setTodoList] = useState(() => {
    const saved: any = localStorage.getItem("data");
    const inital = JSON.parse(saved);
    return inital || "";
  });

  const editTask = (
    id: number,
    task: string,
    date: string,
    notes: string,
    time: string
  ) => {
    toDoList.map((element: TodoType) => {
      if (element.id === id) {
        element.task = task;
        element.date = date;
        element.time = time;
        element.notes = notes;
        localStorage.setItem("data", JSON.stringify(toDoList));
      }
      return null;
    });
  };

  const handleDelete = (id: string) => {
    const newArr = toDoList.filter((task: TodoType) => {
      return task.id !== parseInt(id);
    });
    setTodoList(newArr);
  };

  const addTask = (task: string, date: string, time: string, notes: string) => {
    let copy = [...toDoList];
    copy = [
      ...copy,
      {
        id: Math.floor(Math.random() * 10000),
        task: task,
        date: date,
        time: time,
        notes: notes,
      },
    ];

    copy = copy.sort((task1, task2) => {
      return new Date(task1.date).getTime() - new Date(task2.date).getTime();
    });

    setTodoList(copy);
  };

  // update local storage when new task is added
  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(toDoList));
  });

  const [colorScheme, setColorScheme] = useLocalStorageValue<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "light",
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <div className="App" style={{ textAlign: "center" }}>
      <MantineProvider theme={{ colorScheme }}>
        <ColorSchemeProvider
          colorScheme={colorScheme}
          toggleColorScheme={toggleColorScheme}
        >
          <NotificationsProvider position="top-left">
            <Paper className="app-bg">
              <ThemeToggle />
              <Header title=" Schoolweek" />
              <TodoList
                list={toDoList}
                handleDelete={handleDelete}
                editTask={editTask}
                theme={colorScheme}
              />

              <AddTaskButton addTask={addTask} />
              <Footer />
            </Paper>
          </NotificationsProvider>
        </ColorSchemeProvider>
      </MantineProvider>
    </div>
  );
};

export default App;
