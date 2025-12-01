// src/utils/localStorage.js

// Função para buscar os favoritos guardados
export const getFavorites = () => {
    const favs = localStorage.getItem("catFavorites"); // tenta ler o item 'catFavorites'
    return favs ? JSON.parse(favs) : []; // se existir, converte de JSON para array, senão devolve array vazio
  };
  
  // Função para guardar favoritos
  export const saveFavorites = (favorites) => {
    localStorage.setItem("catFavorites", JSON.stringify(favorites)); 
    // converte o array de favoritos em string JSON e guarda no localStorage
  };
  