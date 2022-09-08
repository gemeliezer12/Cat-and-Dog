import { CatDogProvider } from "./Contexts/CatDogContext";
import { ThemeProvider } from "./Contexts/ThemeContext";
import Breeds from "./Pages/Breeds";
import Dogs from "./Pages/Dogs";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./Styles/globals.css";
import { createTheme } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import { ThemeProvider as MaterialUIThemeProvider } from "@mui/material/styles";
import Cats from "./Pages/Cats";

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: 'light',
    },
  });

  return (
    <Router>
      <MaterialUIThemeProvider theme={darkTheme}>
        <ThemeProvider>
          <CatDogProvider>
            <div
              style={{
                overflowY: "auto",
                overflowX: "hidden",
                height: "100vh",
                width: "100vw",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Routes>
                <Route path="/" element={<Breeds />} />
                <Route path="dogs/:breeds_id" element={<Dogs />} />
                <Route path="cats/:breeds_id" element={<Cats />} />
              </Routes>
            </div>
            <Checkbox defaultChecked />
          </CatDogProvider>
        </ThemeProvider>
      </MaterialUIThemeProvider>
    </Router>
  );
}

export default App;
