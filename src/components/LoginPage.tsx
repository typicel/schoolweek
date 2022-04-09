import React from "react";
import { Button } from "@mantine/core";
import { signInWithPopup } from "firebase/auth";
import { auth, provider, db } from "../firebase-config";
import { showNotification } from "@mantine/notifications";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

const LoginPage = () => {
  const handleAuth = () => {
    signInWithPopup(auth, provider)
      .then(async (res) => {
        console.log(res);
        // on sign in , create a document in the users collection containing the users information (wont create if already exists)
        await setDoc(doc(db, "users", res.user.uid), {
          displayName: res.user.displayName,
          uid: res.user.uid,
          email: res.user.email,
        });
      })
      .catch((err) => {
        showNotification({
          title: "Error authenticating user",
          message: err.message,
          color: "red",
        });
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <Button onClick={handleAuth} color="blue">
        Login with Google
      </Button>
    </div>
  );
};

export default LoginPage;
