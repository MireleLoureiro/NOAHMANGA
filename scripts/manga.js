const mangaDiv = document.getElementById("mangas");
const favoritosDiv = document.getElementById("favoritos");
const searchInput = document.getElementById("search");

let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

// Função para buscar mangás na API
function buscarMangas(nome) {
  fetch(`https://api.jikan.moe/v4/manga?q=${nome}&limit=12`)
    .then(res => res.json())
    .then(data => {
      mostrarMangas(data.data);
    })
    .catch(() => {
      mangaDiv.innerHTML = "<p>Erro ao buscar mangás.</p>";
    });
}

// Função para mostrar os mangás buscados
function mostrarMangas(lista) {
  mangaDiv.innerHTML = ""; // limpa antes
  lista.forEach(manga => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${manga.images.jpg.image_url}" alt="${manga.title}">
      <h3>${manga.title}</h3>
      <p>${manga.synopsis ? manga.synopsis.substring(0, 80) + "..." : "Sem sinopse"}</p>
      <button>Favoritar</button>
    `;

    const btn = card.querySelector("button");
    btn.onclick = function () {
      adicionarFavorito(manga);
    };

    mangaDiv.appendChild(card);
  });
}

function adicionarFavorito(manga) {
  if (!favoritos.some(fav => fav.mal_id === manga.mal_id)) {
    favoritos.push(manga);
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
    mostrarFavoritos();
  }
}

function removerFavorito(id) {
  favoritos = favoritos.filter(f => f.mal_id !== id);
  localStorage.setItem("favoritos", JSON.stringify(favoritos));
  mostrarFavoritos();
}

function mostrarFavoritos() {
  favoritosDiv.innerHTML = "";
  favoritos.forEach(manga => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${manga.images.jpg.image_url}" alt="${manga.title}">
      <h3>${manga.title}</h3>
      <button>Remover</button>
    `;

    const btn = card.querySelector("button");
    btn.style.backgroundColor = 'red';
    btn.onclick = function () {
      removerFavorito(manga.mal_id);
    };

    favoritosDiv.appendChild(card);
  });
}

searchInput.addEventListener("input", () => {
  const texto = searchInput.value.trim();
  buscarMangas(texto);
});

// Inicializa a tela
mostrarFavoritos();
buscarMangas(""); // mostra mangás iniciais
