import React from "react";
import { Button } from "react-bootstrap";

const ThemeToggle = ({ theme, toggleTheme }) => {
  return (
    <div className="d-flex justify-content-end">
      <Button className="m-4" variant="secondary" onClick={toggleTheme}>
        Toggle Theme
      </Button>
    </div>
  );
};

export default ThemeToggle;
