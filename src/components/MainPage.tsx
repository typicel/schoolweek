import React from "react";
import TodoList from "./TodoList";
import AddTaskButton from "./AddTaskButton";
import Footer from "./Footer";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { auth, db } from "../firebase-config";
import { showNotification } from "@mantine/notifications";

const MainPage = ({ colorScheme }) => {
  const userTodosRef = collection(db, "users", auth.currentUser.uid, "tasks");
  const q = query(userTodosRef, orderBy("date", "desc"));

  const [toDoList] = useCollectionData(q);

  const editTask = (
    id: number,
    task: string,
    date: string,
    notes: string,
    time: string
  ) => {
    let docRef = doc(db, auth.currentUser.uid, String(id));
    setDoc(docRef, {
      id,
      task,
      date,
      notes,
      time,
    });
  };

  const addTask = (task: string, date: string, time: string, notes: string) => {
    let newTask = {
      task,
      date,
      time,
      notes,
      author: {
        uid: auth.currentUser.uid,
        name: auth.currentUser.displayName,
      },
    };
    addDoc(userTodosRef, newTask);
  };

  const handleDelete = async (id: number) => {
    let docRef = doc(db, auth.currentUser.uid, String(id));
    deleteDoc(docRef)
      .then(() => {
        showNotification({
          message: "✅ Task deleted",
          autoClose: 2500,
        });
      })
      .catch((err) => {
        showNotification({
          title: "❌ Error",
          message: err,
          autoClose: 2500,
        });
      });
  };

  return (
    <>
      <p>Current user: {auth.currentUser.displayName}</p>
      <TodoList
        list={toDoList}
        handleDelete={handleDelete}
        editTask={editTask}
        theme={colorScheme}
      />
      <AddTaskButton addTask={addTask} />
      <Footer />
    </>
  );
};

export default MainPage;
