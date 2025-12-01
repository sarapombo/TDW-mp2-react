import { useEffect, useState } from "react";
import "./styles/CatFactCard.css"; // cria o CSS separado para este card

export default function CatFactCard() {
  const [fact, setFact] = useState("");

  useEffect(() => {
    const fetchFact = async () => {
      try {
        const res = await fetch("https://catfact.ninja/fact");
        const data = await res.json();
        setFact(data.fact);
      } catch (err) {
        console.error("Erro ao buscar curiosidade:", err);
      }
    };
    fetchFact();
  }, []);

  if (!fact) return null;

  return (
    <div className="cat-fact-card">
      <p>🐱 <strong>Curiosidade:</strong> {fact}</p>
    </div>
  );
}
