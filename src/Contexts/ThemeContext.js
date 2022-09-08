import React, { useContext, useEffect, useState } from "react";

const ThemeContext = React.createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [colorTheme, setColorTheme] = useState(null);

  useEffect(() => {
    setColorTheme("light");
  }, []);

  useEffect(() => {
    document.body.classList = colorTheme;
  }, [colorTheme]);

  const value = {
    colorTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
