import { useState, useEffect } from "react";
import AnimalCard from "./AnimalCard";
import { getFavorites, saveFavorites } from "../utils/localStorage";
import "./styles/Gallery.css";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  const handleRemoveFavorite = (id) => {
    const updated = favorites.filter(a => a.id !== id);
    setFavorites(updated);
    saveFavorites(updated);
  };

  return (
    <div className="gallery-container">
      <h2>Animais Favoritos ❤️</h2>

      {favorites.length === 0 ? (
        <p>Nenhum favorito ainda.</p>
      ) : (
        <div className="gallery">
          {favorites.map(a => (
            <AnimalCard
              key={a.id}
              animal={a}
              onDelete={() => handleRemoveFavorite(a.id)}
              onFavorite={() => handleRemoveFavorite(a.id)}
              isFavorite={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}
