import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";

import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";

ReactDOM.render(
  <React.StrictMode>
    <MantineProvider>
      <NotificationsProvider position="top-left">
        <App />
      </NotificationsProvider>
    </MantineProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
