import React from "react";
import { Global } from "@mantine/core";

const GlobalS = () => {
  return (
    <Global
      styles={(theme) => ({
        backgroundColor:
          theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
        color:
          theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
      })}
    />
  );
};

export default GlobalS;
