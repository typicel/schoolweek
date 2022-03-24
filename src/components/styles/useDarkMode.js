import React, { useState } from "react";

const useDarkMode = ({ initial }) => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
    console.log(`Set theme: ${theme}`);
    localStorage.setItem("theme", theme);
  };

  return [theme, toggleTheme];
};

export default useDarkMode;
