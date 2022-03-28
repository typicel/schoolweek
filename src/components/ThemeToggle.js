import React from "react";
import { Button } from "react-bootstrap";

const ThemeToggle = ({ applyTheme }) => {
  return (
    <div className="d-flex justify-content-end m-3">
      <Button
        className="m-1"
        variant="secondary"
        onClick={() => applyTheme("dark")}
      >
        Dark
      </Button>
      <Button
        className="m-1"
        variant="secondary"
        onClick={() => applyTheme("light")}
      >
        Light
      </Button>
    </div>
  );
};

export default ThemeToggle;
