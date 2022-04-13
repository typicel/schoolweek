import React from "react";
import MainPage from "./components/MainPage";
import LoginPage from "./components/LoginPage";
import Header from "./components/Header";
import ThemeToggle from "./components/ThemeToggle";
import "firebase/auth";
import {
  MantineProvider,
  ColorSchemeProvider,
  Paper,
  ColorScheme,
  Button,
  Group,
} from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { useLocalStorageValue } from "@mantine/hooks";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase-config";
import { onAuthStateChanged } from "firebase/auth";
					
const App = () => {
  const [colorScheme, setColorScheme] = useLocalStorageValue<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "light",
  });

  const [user] = useAuthState(auth);

  const unsubscribe = onAuthStateChanged(auth, () => {
    if (!auth) {
      //If user logs out, we should unsubscribe from any db updates
      unsubscribe();
    }
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
              <Group className="mx-3" position="right">
                <ThemeToggle />
                <SignOut />
              </Group>
              <Header title="Schoolweek" />
              {user ? <MainPage colorScheme={colorScheme} /> : <LoginPage />}
            </Paper>
          </NotificationsProvider>
        </ColorSchemeProvider>
      </MantineProvider>
    </div>
  );
};


const SignOut = () => {
  return (
    auth.currentUser && (
      <Button onClick={() => auth.signOut()} color="red">
        Sign Out
      </Button>
    )
  );
};

export default App;
