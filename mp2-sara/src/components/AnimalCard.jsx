import { FaHeart, FaTrash, FaEdit } from "react-icons/fa";

export default function AnimalCard({ animal, onEdit, onDelete, onFavorite, isFavorite, onSelect }) {
  const breed = animal.breeds && animal.breeds[0] ? animal.breeds[0] : null;

  return (
    <div className="card" onClick={onSelect} style={{ cursor: 'pointer' }}>
      <img src={animal.url} alt={breed?.name || "Animal"} />
      <div className="card-info">
        <h3>{breed?.name || "Desconhecida"}</h3>
        <div className="card-buttons">
          <button onClick={(e) => { e.stopPropagation(); onEdit(animal.id); }}>
            <FaEdit />
          </button>
          <button onClick={(e) => { e.stopPropagation(); onDelete(animal.id); }}>
            <FaTrash />
          </button>
          <button onClick={(e) => { e.stopPropagation(); onFavorite(animal); }}>
            <FaHeart color={isFavorite ? "red" : "gray"} />
          </button>
        </div>
      </div>
    </div>
  );
}
