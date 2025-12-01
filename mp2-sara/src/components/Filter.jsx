import { useEffect, useState } from "react";
import "./styles/Filter.css";

export default function Filter({ onChange, animalType }) {
  const [breeds, setBreeds] = useState([]);
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
        let data = await res.json();

        // Filtra apenas raças válidas
        data = data.filter(b => b.id && b.name);

        setBreeds(data);
      } catch (err) {
        console.error("Erro ao carregar raças:", err);
        setBreeds([]);
      }
    };

    fetchBreeds();
  }, [animalType]);

  return (
    <div className="filter">
      <select className="breed-select" onChange={e => onChange(e.target.value)}>
        <option value="">Todas as raças</option>
        {breeds.map(breed => (
          <option
            key={breed.id}
            value={breed.id} // Gatos: breed_ids / Cães: breed_id será tratado no fetch
          >
            {breed.name}
          </option>
        ))}
      </select>
    </div>
  );
}
