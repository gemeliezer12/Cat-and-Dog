import { CatDogProvider } from "./Contexts/CatDogContext";
import { ThemeProvider } from "./Contexts/ThemeContext";
import Breeds from "./Pages/Breeds";
import CatDog from "./Pages/CatDog";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./Styles/globals.css";

function App() {

  return (
    <Router>
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
              <Route path="/:breeds_id" element={<CatDog />} />
            </Routes>
          </div>
        </CatDogProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
