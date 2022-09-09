import { CatDogProvider } from "./Contexts/CatDogContext";
import { ThemeProvider } from "./Contexts/ThemeContext";
import Breeds from "./Pages/Breeds";
import Dogs from "./Pages/Dogs";
import { Routes, Route, Link } from "react-router-dom";
import "./Styles/globals.css";
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
          <div className="dark" style={{
            height: "70px",
            minHeight: "70px",
            width: "100%",
            backgroundColor: "var(--base-color-indigo)",
            display: "flex",
            position: "sticky",
            top: "0",
            zIndex: "1",
            paddingLeft: "32px",
            paddingRight: "20px",
          }}>
            <div style={{
              display: "flex",
              gap: "16px",
              alignItems: "center",
              fontSize: "26px",
              fontWeight: "700"
            }}>
              <Link to={"/"} style={{
                cursor: "pointer",
              }}>Home</Link>
              <Link to={"/cats"} style={{
                cursor: "pointer",
              }}>Cats</Link>
              <Link to={"/dogs"} style={{
                cursor: "pointer",
              }}>Dogs</Link>
            </div>
          </div>
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
