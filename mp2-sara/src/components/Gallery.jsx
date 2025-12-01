import { useEffect, useState } from "react";
import AnimalCard from "./AnimalCard";
import AnimalDetail from "./AnimalDetail";
import Filter from "./Filter";
import { saveFavorites, getFavorites } from "../utils/localStorage";
import Button from "./Button";
import { FaPlus } from "react-icons/fa";
import "./styles/Gallery.css";
import CatFactCard from "./CatFactCard";

export default function Gallery() {
  const [animals, setAnimals] = useState([]);
  const [filter, setFilter] = useState("");
  const [favorites, setFavorites] = useState(getFavorites());
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState("");
  const [showBreedDropdown, setShowBreedDropdown] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [animalType, setAnimalType] = useState("cat");

  const API_KEY_CAT = import.meta.env.VITE_CAT_API_KEY;
  const API_KEY_DOG = import.meta.env.VITE_DOG_API_KEY;

  const handleAnimalTypeChange = (type) => {
    setAnimalType(type);
    setSelectedAnimal(null);
    setFilter("");
    setSelectedBreed("");
  };

  // Buscar animais
  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        let url = "";
        if (animalType === "cat") {
          url = `https://api.thecatapi.com/v1/images/search?limit=5&api_key=${API_KEY_CAT}&has_breeds=1`;
          if (filter) url += `&breed_ids=${filter}`;
        } else {
          url = `https://api.thedogapi.com/v1/images/search?limit=5&api_key=${API_KEY_DOG}`;
          if (filter) url += `&breed_id=${filter}`;
        }

        const res = await fetch(url);
        let data = await res.json();

        if (animalType === "dog") data = data.filter(a => a.breeds && a.breeds.length > 0);

        setAnimals(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAnimals();
  }, [animalType, filter]);

  // Buscar raças
  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const url =
          animalType === "cat"
            ? "https://api.thecatapi.com/v1/breeds"
            : "https://api.thedogapi.com/v1/breeds";
        const res = await fetch(url);
        let data = await res.json();

        if (animalType === "dog") data = data.filter(b => b.id && b.name);

        setBreeds(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBreeds();
  }, [animalType]);

  // Favoritos
  const handleFavorite = (animal) => {
    const exists = favorites.find(fav => fav.id === animal.id);
    const updated = exists
      ? favorites.filter(fav => fav.id !== animal.id)
      : [...favorites, animal];
    setFavorites(updated);
    saveFavorites(updated);
  };

  const handleDelete = (id) => setAnimals(prev => prev.filter(a => a.id !== id));

  const handleEdit = (id) => {
    if (animalType !== "cat") return;
    const newName = prompt("Novo nome da raça:");
    setAnimals(prev =>
      prev.map(a => a.id === id ? { ...a, breeds: [{ name: newName }] } : a)
    );
  };

  const handleAddRandom = async () => {
    try {
      const url =
        animalType === "cat"
          ? `https://api.thecatapi.com/v1/images/search?limit=1&api_key=${API_KEY_CAT}&has_breeds=1`
          : `https://api.thedogapi.com/v1/images/search?limit=1&api_key=${API_KEY_DOG}`;
      const res = await fetch(url);
      let data = await res.json();

      if (animalType === "dog") data = data.filter(a => a.breeds && a.breeds.length > 0);

      if (data.length > 0) setAnimals(prev => [data[0], ...prev]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddByBreed = async () => {
    if (!selectedBreed) return;
    try {
      const url =
        animalType === "cat"
          ? `https://api.thecatapi.com/v1/images/search?limit=1&breed_ids=${selectedBreed}&api_key=${API_KEY_CAT}`
          : `https://api.thedogapi.com/v1/images/search?limit=1&breed_id=${selectedBreed}&api_key=${API_KEY_DOG}`;
      const res = await fetch(url);
      let data = await res.json();

      if (animalType === "dog") data = data.filter(a => a.breeds && a.breeds.length > 0);

      if (data.length > 0) setAnimals(prev => [data[0], ...prev]);
      setShowBreedDropdown(false);
      setSelectedBreed("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="gallery-container">
      {/* Linha de seleção de animal e filtro */}
      <div className="animal-filter-row">
        <div className="animal-toggle">
          <Button
            text="Gatos"
            onClick={() => handleAnimalTypeChange("cat")}
            className={animalType === "cat" ? "active" : ""}
          />
          <Button
            text="Cães"
            onClick={() => handleAnimalTypeChange("dog")}
            className={animalType === "dog" ? "active" : ""}
          />
        </div>

        <div className="breed-filter">
          <Filter onChange={setFilter} animalType={animalType} />
        </div>
      </div>

      {/* Botões de adicionar */}
      <div className="button-row">
        <Button text="Adicionar aleatório" icon={FaPlus} onClick={handleAddRandom} />
        <Button
          text="Adicionar por raça"
          icon={FaPlus}
          onClick={() => setShowBreedDropdown(prev => !prev)}
        />
        {showBreedDropdown && (
          <>
            <select
              className="breed-select"
              value={selectedBreed}
              onChange={(e) => setSelectedBreed(e.target.value)}
            >
              <option value="">Escolher raça...</option>
              {breeds.map(b => (
                <option key={b.id} value={b.id}>{b.name}</option>
              ))}
            </select>
            <Button
              text="Adicionar"
              icon={FaPlus}
              onClick={handleAddByBreed}
              disabled={!selectedBreed}
            />
          </>
        )}
      </div>

      {/* Mostrar CatFactCard apenas para gatos */}
      {animalType === "cat" && <CatFactCard />}

      {/* Galeria */}
      <div className="gallery">
        {animals.map(a => (
          <AnimalCard
            key={a.id}
            animal={a}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onFavorite={handleFavorite}
            isFavorite={favorites.some(fav => fav.id === a.id)}
            onSelect={() => setSelectedAnimal(a)}
          />
        ))}
      </div>

      {selectedAnimal && (
        <AnimalDetail
          animal={selectedAnimal}
          onClose={() => setSelectedAnimal(null)}
        />
      )}
    </div>
  );
}
