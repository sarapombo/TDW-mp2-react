import { useEffect, useState } from "react";
import Button from "./Button"; // seu componente
import "./styles/BreedsPage.css";

export default function BreedsPage() {
  const [breeds, setBreeds] = useState([]);
  const [animalType, setAnimalType] = useState("cat"); // cat ou dog

  const API_KEY_CAT = import.meta.env.VITE_CAT_API_KEY;
  const API_KEY_DOG = import.meta.env.VITE_DOG_API_KEY;

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const url =
          animalType === "cat"
            ? `https://api.thecatapi.com/v1/breeds?api_key=${API_KEY_CAT}`
            : `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY_DOG}`;

        const res = await fetch(url);
        const data = await res.json();

        // Para cães, só mostra raças com imagem
        const filtered = animalType === "dog"
          ? data.filter(b => b.image && b.image.url)
          : data;

        setBreeds(filtered);
      } catch (err) {
        console.error("Erro ao buscar raças:", err);
      }
    };
    fetchBreeds();
  }, [animalType]);

  return (
    <div className="breeds-page">
      <div className="animal-toggle">
        <Button
          text="Gatos"
          onClick={() => setAnimalType("cat")}
          style={{ fontWeight: animalType === "cat" ? "bold" : "normal" }}
        />
        <Button
          text="Cães"
          onClick={() => setAnimalType("dog")}
          style={{ fontWeight: animalType === "dog" ? "bold" : "normal" }}
        />
      </div>

      <h2>Raças de {animalType === "cat" ? "Gatos" : "Cães"}</h2>

      <div className="breeds-grid">
        {breeds.map(breed => (
          <div key={breed.id} className="breed-card">
            {breed.image && <img src={breed.image.url} alt={breed.name} />}
            <h3>{breed.name}</h3>
            {breed.origin && <p><strong>Origem:</strong> {breed.origin}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
