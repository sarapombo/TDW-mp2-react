// src/components/PetFoodCard.jsx
import { useEffect, useState } from "react";
import "./styles/CatFactCard.css";

/*
  Componente que recebe `animal` (objecto vindo da API de imagens)
  Exemplo animal.breeds[0].name => "Bengal"
  animalType opcional: "cat" | "dog" (se tiveres esse estado, passa-o)
*/

export default function PetFoodCard({ animal, animalType = "cat" }) {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    // sempre que mudar o animal, refaz a pesquisa
    if (!animal) return;

    const breedName = animal?.breeds?.[0]?.name || "";
    const query = breedName ? `${breedName} ${animalType} food` : `${animalType} food`;

    const fetchProduct = async () => {
      setLoading(true);
      setProduct(null);
      setError("");

      try {
        // 1) Busca produtos (retorna uma lista)
        const searchUrl = `https://world.openpetfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(query)}&search_simple=1&action=process&json=1&page_size=1`;
        const searchRes = await fetch(searchUrl);
        const searchJson = await searchRes.json();

        if (!searchJson || !searchJson.products || searchJson.products.length === 0) {
          setError("Sem informação sobre rações para esta raça.");
          setLoading(false);
          return;
        }

        // 2) Pega o primeiro produto e pede o detalhe por barcode (code)
        const first = searchJson.products[0];
        const code = first.code || first._id || first.packaging_code; // fallback
        if (!code) {
          // se não houver barcode, usamos o objecto `first` tal como está
          setProduct(first);
          setLoading(false);
          return;
        }

        const detailUrl = `https://world.openpetfoodfacts.org/api/v0/product/${code}.json`;
        const detailRes = await fetch(detailUrl);
        const detailJson = await detailRes.json();

        if (detailJson && detailJson.status === 1 && detailJson.product) {
          setProduct(detailJson.product);
        } else {
          // fallback para o primeiro produto da pesquisa
          setProduct(first);
        }
      } catch (err) {
        console.error("PetFoodCard error:", err);
        setError("Erro ao consultar a base de dados de rações.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [animal, animalType]);

  if (!animal) return null;

  return (
    <div className="pet-food-card">
      {loading && <p>Carregando informação sobre alimentação…</p>}
      {!loading && error && <p className="no-info">{error}</p>}
      {!loading && product && (
        <div className="pet-food-content">
          {product.image_front_small_url || product.image_url ? (
            <img
              src={product.image_front_small_url || product.image_url}
              alt={product.product_name || "Produto"}
            />
          ) : null}

          <h4>{product.product_name || product.name || "Produto sem nome"}</h4>
          {product.brands && <p><strong>Marca:</strong> {product.brands}</p>}
          {product.categories && <p><strong>Categorias:</strong> {product.categories}</p>}

          {/* Mostrar alguns nutrimentos se existirem */}
          {product.nutriments && (
            <div className="nutriments">
              {product.nutriments["proteins_100g"] && <p>Proteínas: {product.nutriments["proteins_100g"]} g/100g</p>}
              {product.nutriments["fat_100g"] && <p>Gordura: {product.nutriments["fat_100g"]} g/100g</p>}
              {product.nutriments["carbohydrates_100g"] && <p>Hidratos: {product.nutriments["carbohydrates_100g"]} g/100g</p>}
            </div>
          )}

          {/* link para mais detalhe no OpenPetFoodFacts */}
          {product.code && (
            <p>
              <a
                href={`https://world.openpetfoodfacts.org/product/${product.code}`}
                target="_blank"
                rel="noreferrer"
              >
                Ver na base de dados
              </a>
            </p>
          )}
        </div>
      )}
    </div>
  );
}
