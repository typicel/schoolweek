import { useState } from "react";

const useDarkMode = () => {
  const [theme, setTheme] = useState(true);

  const toggleTheme = () => {
    setTheme(!theme);
  };

  return [theme, toggleTheme];
};

export default useDarkMode;
