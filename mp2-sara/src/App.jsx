import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Gallery from "./components/Gallery";
import Favorites from "./components/Favorites";
import BreedsPage from "./components/BreedsPage"; 
import PetFoodList from "./components/PetFoodList";

export default function App() {
  return (
    <>
      <Header />
      <main style={{ padding: "20px", maxWidth: 1100, margin: "0 auto" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} /> 
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/breeds" element={<BreedsPage />} />
          <Route path="/foods" element={<PetFoodList />} />
        </Routes>
      </main>
    </>
  );
}

