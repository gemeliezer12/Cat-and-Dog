import { PetProvider } from "./Contexts/PetContext";
import { ThemeProvider } from "./Contexts/ThemeContext";
import Breeds from "./Pages/Breeds";
import Dogs from "./Pages/Dogs";
import { Routes, Route } from "react-router-dom";
import "./Styles/globals.css";
import Cats from "./Pages/Cats";
import PetImageModal from "./Components/PetImageModal";
import Navbar from "./Components/Navbar";
import ScrollToTop from "./Components/ScrollToTop";

function App() {
  return (
    <ThemeProvider>
      <PetProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Breeds />} />
          <Route path="/dogs" element={<Dogs />} />
          <Route path="/cats" element={<Cats />} />
        </Routes>
        <PetImageModal />
        <ScrollToTop />
      </PetProvider>
    </ThemeProvider>
  );
}

export default App;
