import { CatDogProvider } from "./Contexts/CatDogContext";
import { ThemeProvider } from "./Contexts/ThemeContext";
import Breeds from "./Pages/Breeds";
import Dogs from "./Pages/Dogs";
import { Routes, Route } from "react-router-dom";
import "./Styles/globals.css";
import Cats from "./Pages/Cats";
import CatDogImageModal from "./Components/CatDogImageModal";
import Navbar from "./Components/Navbar";

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
          <Navbar />
          <Routes>
            <Route path="/" element={<Breeds />} />
            <Route path="/dogs" element={<Dogs />} />
            <Route path="/cats" element={<Cats />} />
          </Routes>
          <CatDogImageModal />
        </div>
      </CatDogProvider>
    </ThemeProvider>
  );
}

export default App;
