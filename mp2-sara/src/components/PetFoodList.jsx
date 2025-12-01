import { useEffect, useState } from "react";
import Button from "./Button";
import "./styles/PetFoodList.css";

export default function PetFoodList() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("cat"); // cat | dog | all

  useEffect(() => {
    const fetchFoods = async () => {
      setLoading(true);

      let query = "";
      if (filter === "cat") query = "cat food";
      else if (filter === "dog") query = "dog food";
      else query = "pet food";

      const url = `https://world.openpetfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(
        query
      )}&search_simple=1&action=process&json=1&page_size=20`;

      try {
        const res = await fetch(url);
        const json = await res.json();
        setFoods(json.products || []);
      } catch (err) {
        console.error("Erro na API:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, [filter]);

  return (
    <div className="petfood-container">
      <h2>Rações Disponíveis</h2>

      {/* FILTRO POR BOTÕES */}
      <div className="petfood-buttons">
        <Button
          text="Gatos"
          onClick={() => setFilter("cat")}
          className={filter === "cat" ? "active" : ""}
        />
        <Button
          text="Cães"
          onClick={() => setFilter("dog")}
          className={filter === "dog" ? "active" : ""}
        />
        <Button
          text="Todos"
          onClick={() => setFilter("all")}
          className={filter === "all" ? "active" : ""}
        />
      </div>

      {loading && <p>A carregar...</p>}

      <div className="petfood-grid">
        {foods.length === 0 && !loading && <p>Sem resultados.</p>}

        {foods.map((item) => (
          <div key={item.code || Math.random()} className="petfood-card">
            {item.image_front_small_url && (
              <img
                src={item.image_front_small_url}
                alt={item.product_name}
                className="petfood-image"
              />
            )}

            <h4>{item.product_name || "Sem nome"}</h4>
            {item.brands && <p><strong>Marca:</strong> {item.brands}</p>}

            <a
              href={`https://world.openpetfoodfacts.org/product/${item.code}`}
              target="_blank"
              rel="noreferrer"
            >
              Ver detalhes
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
