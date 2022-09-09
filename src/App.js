import { CatDogProvider } from "./Contexts/CatDogContext";
import { ThemeProvider } from "./Contexts/ThemeContext";
import Breeds from "./Pages/Breeds";
import Dogs from "./Pages/Dogs";
import { Routes, Route } from "react-router-dom";
import "./Styles/globals.css";
import Checkbox from "@mui/material/Checkbox";
import Cats from "./Pages/Cats";
import CatDogImageModal from "./Components/CatDogImageModal";

function App() {
  return (
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
            <Route path="/dogs" element={<Dogs />} />
            <Route path="/cats" element={<Cats />} />
          </Routes>
          <CatDogImageModal />
        </div>
        <Checkbox defaultChecked />
      </CatDogProvider>
    </ThemeProvider>
  );
}

export default App;
