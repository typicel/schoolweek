import { useState, useEffect } from "react";
import { MantineProvider, ColorSchemeProvider, Paper } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { useHotkeys, useLocalStorageValue } from "@mantine/hooks";

import TodoList from "./components/TodoList";
import Footer from "./components/Footer";
import Header from "./components/Header";
import AddTaskButton from "./components/AddTaskButton";
import ThemeToggle from "./components/ThemeToggle";

const App = () => {
  const [toDoList, setTodoList] = useState(() => {
    const saved = localStorage.getItem("data");
    const inital = JSON.parse(saved);
    return inital || "";
  });

  const editTask = (id, task, date, notes, time) => {
    toDoList.map((element) => {
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

  const [colorScheme, setColorScheme] = useLocalStorageValue({
    key: "mantine-color-scheme",
    defaultValue: "light",
  });

  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  useHotkeys([["mod+J", () => toggleColorScheme()]]);

  return (
    <div className="App" style={{ textAlign: "center" }}>
      <MantineProvider theme={{ colorScheme }}>
        <ColorSchemeProvider
          colorScheme={colorScheme}
          toggleColorScheme={toggleColorScheme}
        >
          <NotificationsProvider position="top-left">
            <Paper>
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
