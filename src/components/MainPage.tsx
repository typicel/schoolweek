import React from "react";
import AddTaskButton from "./AddTaskButton";
import Footer from "./Footer";
import TodoList from "./TodoList";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { auth, db } from "../firebase-config";
import { showNotification } from "@mantine/notifications";

const MainPage = ({ colorScheme }) => {
  const userTodosRef = collection(db, "users", auth.currentUser.uid, "tasks");

  const q = query(
    userTodosRef,
    where("author.uid", "==", auth.currentUser.uid)
  );

  const [values] = useCollectionData(q);

  const editTask = (
    id: number,
    task: string,
    date: string,
    notes: string,
    time: string
  ) => {
    let docRef = doc(db, `users/${auth.currentUser.uid}/tasks/${id}`);
    setDoc(docRef, {
      id,
      task,
      date,
      notes,
      time,
      author: {
        uid: auth.currentUser.uid,
        name: auth.currentUser.displayName,
      },
    });
  };

  const addTask = async (
    task: string,
    date: string,
    time: string,
    notes: string
  ) => {
    addDoc(userTodosRef, {
      task,
      date,
      time,
      notes,
      author: {
        uid: auth.currentUser.uid,
        name: auth.currentUser.displayName,
      },
    }).then((res) => {
      let newDoc = doc(db, `users/${auth.currentUser.uid}/tasks/${res.id}`);

      setDoc(newDoc, {
        task,
        date,
        time,
        notes,
        author: {
          uid: auth.currentUser.uid,
          name: auth.currentUser.displayName,
        },
        id: res.id,
      });
    });
  };

  const handleDelete = (id: number) => {
    deleteDoc(doc(db, `users/${auth.currentUser.uid}/tasks/${id}`))
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
        list={values}
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
