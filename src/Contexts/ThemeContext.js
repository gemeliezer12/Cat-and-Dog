import React, { useContext, useEffect, useState } from "react";
import {
  createTheme,
  ThemeProvider as MaterialUIThemeProvider,
} from "@mui/material/styles";

const ThemeContext = React.createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [colorTheme, setColorTheme] = useState("light");

  const muiTheme = createTheme({
    palette: {
      mode: colorTheme,
    },
  });

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
    <ThemeContext.Provider value={value}>
      <MaterialUIThemeProvider theme={muiTheme}>
        {children}
      </MaterialUIThemeProvider>
    </ThemeContext.Provider>
  );
};
