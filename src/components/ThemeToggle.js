import React from "react";
import { Button } from "react-bootstrap";

const ThemeToggle = ({ theme, toggleTheme }) => {
  return (
    <Button variant="secondary" onClick={toggleTheme}>
      Toggle Theme
    </Button>
  );
};

export default ThemeToggle;
