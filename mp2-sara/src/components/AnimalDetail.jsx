import BreedFactCard from "./BreedFactCard";
import PetFoodCard from "./PetFoodCard";

export default function AnimalDetail({ animal, onClose, animalType }) {
  if (!animal) return null;

  const breed = animal.breeds && animal.breeds[0] ? animal.breeds[0] : null;

  return (
    <div className="cat-detail-overlay" onClick={onClose}>
      <div className="cat-detail-card" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>X</button>

        {/* Mostrar BreedFactCard apenas para gatos */}
        {animalType === "cat" && breed && <BreedFactCard breed={breed} />}

        <img src={animal.url} alt={breed?.name || "Animal"} />
        <h2>{breed?.name || "Desconhecida"}</h2>

        {breed?.origin && <p><strong>Origem:</strong> {breed.origin}</p>}
        {breed?.temperament && <p><strong>Temperamento:</strong> {breed.temperament}</p>}
        {breed?.life_span && <p><strong>Esperança de vida:</strong> {breed.life_span}</p>}
        {breed?.weight?.metric && <p><strong>Peso:</strong> {breed.weight.metric} kg</p>}
        {breed?.height?.metric && <p><strong>Altura:</strong> {breed.height.metric} cm</p>}

        {/* Informação sobre alimentação */}
        <h3 style={{ marginTop: "20px" }}>Alimentação recomendada</h3>
        <PetFoodCard animal={animal} animalType={animalType} />
      </div>
    </div>
  );
}
