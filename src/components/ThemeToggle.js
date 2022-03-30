import React, { useState } from "react";
import { Switch } from "@mantine/core";

const ThemeToggle = ({ applyTheme, theme }) => {
  const [checked, setChecked] = useState(theme === "dark" ? true : false);

  return (
    <div className="d-flex justify-content-end m-3">
      <Switch
        checked={checked}
        size="md"
        onChange={(event) => {
          setChecked(event.currentTarget.checked);
          let newTheme = event.currentTarget.checked ? "dark" : "light";
          applyTheme(newTheme);
        }}
        color="dark"
      />
    </div>
  );
};

export default ThemeToggle;
