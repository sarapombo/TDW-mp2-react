// utils/catFacts.js
export const getCatFact = async () => {
    try {
      const res = await fetch("https://catfact.ninja/fact");
      if (!res.ok) throw new Error("Erro ao buscar factos");
      const data = await res.json();
      return data.fact; // retorna a string do fact
    } catch (err) {
      console.error(err);
      return null;
    }
  };
  