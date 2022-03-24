import React, { useState, useEffect } from "react";

const useDarkMode = () => {
  const [theme, setTheme] = useState(false);

  const toggleTheme = () => {
    setTheme(!theme);
  };

  return [theme, toggleTheme];
};

export default useDarkMode;
