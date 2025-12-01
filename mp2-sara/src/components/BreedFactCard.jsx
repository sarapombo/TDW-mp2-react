import { useEffect, useState } from "react";

// Factos específicos por raça (exemplo)
const breedFacts = {
  "Abyssinian": "Os Abyssinians são muito curiosos e adoram explorar cada canto da casa.",
  "American Bobtail": "Os American Bobtails têm caudas curtas e são muito brincalhões e afetuosos.",
  "Bengal": "Os Bengals têm pelagem com padrão de leopardo e são muito ativos e inteligentes.",
  "Birman": "Os Birmans são conhecidos pelo seu pelo macio e temperamento calmo e doce.",
  "Bombay": "Os Bombays são gatos negros elegantes e muito sociáveis, adoram companhia humana.",
  "British Shorthair": "Os British Shorthairs são tranquilos, afetuosos e ótimos companheiros de família.",
  "Maine Coon": "Os Maine Coons são gigantes gentis, sociáveis e muito adaptáveis.",
  "Persian": "Os Persas são calmos e adoram ambientes relaxados e confortáveis.",
  "Siamese": "Os Siameses são comunicativos, carinhosos e adoram interagir com humanos.",
  "Sphynx": "Os Sphynx são pelados, afetuosos e adoram atenção e calor humano."
  // podes adicionar mais raças
};

export default function BreedFactCard({ breed }) {
  const [fact, setFact] = useState("");

  useEffect(() => {
    const fetchFact = async () => {
      try {
        // Se não houver breed ou breed.name, assume-se que não é um gato => não mostra nada
        if (!breed || !breed.name) {
          setFact("");
          return;
        }

        // Facto específico da raça, se existir
        if (breedFacts[breed.name]) {
          setFact(breedFacts[breed.name]);
        } else {
          // Facto aleatório de gato
          const res = await fetch("https://catfact.ninja/fact");
          const data = await res.json();
          setFact(data.fact);
        }
      } catch (err) {
        console.error("Erro ao buscar facto:", err);
        setFact(""); // garante que não aparece nada em caso de erro
      }
    };

    fetchFact();
  }, [breed]);

  if (!fact) return null;

  return (
    <div className="breed-fact-card">
      <p>💡 <strong>Curiosidade:</strong> {fact}</p>
    </div>
  );
}
