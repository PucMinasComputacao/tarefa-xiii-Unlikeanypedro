let allArtworks = [];
let favoriteIds = new Set();
let searchTimer = null;

async function fetchItems(query = MET_DEFAULT_QUERY) {
  const container = document.getElementById("artworks-grid");
  if (container) container.innerHTML = "<p>Carregando obras do Metropolitan Museum...</p>";

  try {
    return await searchMetObjects(query, 30);
  } catch (error) {
    console.error("Erro:", error);
    if (container) container.innerHTML = "<p>Nao foi possivel carregar as obras do Metropolitan Museum.</p>";
    return [];
  }
}

function renderFeaturedCarousel(artworks) {
  const carousel = document.getElementById("featured-carousel");
  const indicators = document.getElementById("featured-indicators");
  if (!carousel || !indicators) return;

  const featured = artworks.slice(0, 6);
  carousel.innerHTML = featured.map((art, index) => `
    <div class="carousel-item ${index === 0 ? "active" : ""}">
      <a href="details.html?id=${art.objectID}">
        <img src="${art.image}" class="d-block w-100" alt="${art.title}">
      </a>
      <div class="carousel-caption d-none d-md-block">
        <h5>${art.title}</h5>
        <p>${art.artist}</p>
      </div>
    </div>
  `).join("");

  indicators.innerHTML = featured.map((_, index) => `
    <button type="button" data-bs-target="#featuredCarousel" data-bs-slide-to="${index}" class="${index === 0 ? "active" : ""}" aria-label="Slide ${index + 1}"></button>
  `).join("");
}

function renderCards(artworks) {
  const container = document.getElementById("artworks-grid");
  if (!container) return;

  if (!artworks.length) {
    container.innerHTML = "<p>Nenhuma obra encontrada.</p>";
    return;
  }

  container.innerHTML = artworks.map((art, index) => {
    const isFavorite = favoriteIds.has(Number(art.objectID));
    return `
      <article class="artwork-card" style="animation-delay:${index * 0.1}s">
        <button class="favorite-button ${isFavorite ? "active" : ""}" type="button" data-id="${art.objectID}" aria-label="Alternar favorito">
          ${isFavorite ? "&hearts;" : "&#9825;"}
        </button>
        <a href="details.html?id=${art.objectID}" class="card-link" aria-label="Ver detalhes de ${art.title}">
          <div class="card-image-wrap">
            <img src="${art.thumbnail}" alt="${art.title}" loading="lazy">
            <div class="card-overlay"><span class="card-cta">Ver obra -></span></div>
          </div>
          <div class="card-info">
            <span class="card-category">${art.department || art.category}</span>
            <h3 class="card-title">${art.title}</h3>
            <p class="card-artist">${art.artist} - ${art.year}</p>
            <p class="card-description">${art.description}</p>
            <div class="card-tags">${art.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}</div>
          </div>
        </a>
      </article>
    `;
  }).join("");

  container.querySelectorAll(".favorite-button").forEach(button => {
    button.addEventListener("click", async () => {
      const isActive = await toggleFavorite(button.dataset.id);
      if (getLoggedUser()) {
        button.classList.toggle("active", isActive);
        button.innerHTML = isActive ? "&hearts;" : "&#9825;";
        await loadFavorites();
      }
    });
  });
}

function renderCategoryChart(artworks) {
  const chart = document.getElementById("category-chart");
  if (!chart) return;

  const counts = artworks.reduce((acc, art) => {
    const key = art.department || art.category;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
  const max = Math.max(...Object.values(counts), 1);

  chart.innerHTML = Object.entries(counts).map(([category, count]) => `
    <a class="chart-row" href="gallery/gallery.html">
      <span>${category}</span>
      <div class="chart-track"><div style="width:${(count / max) * 100}%"></div></div>
      <strong>${count}</strong>
    </a>
  `).join("");
}

async function loadFavorites() {
  const user = getLoggedUser();
  if (!user) {
    favoriteIds = new Set();
    return;
  }
  const favorites = await getUserFavorites(user.id);
  favoriteIds = new Set(favorites.map(fav => Number(fav.artworkId)));
}

async function searchAndRender(query) {
  allArtworks = await fetchItems(query || MET_DEFAULT_QUERY);
  renderCards(allArtworks);
  renderCategoryChart(allArtworks);
}

async function init() {
  await loadFavorites();
  await searchAndRender(MET_DEFAULT_QUERY);

  try {
    const highlights = await getMetHighlights(MET_DEFAULT_QUERY, 6);
    renderFeaturedCarousel(highlights.length ? highlights : allArtworks);
  } catch (error) {
    renderFeaturedCarousel(allArtworks);
  }

  const form = document.getElementById("search-form");
  const input = document.getElementById("search-input");
  const clear = document.getElementById("clear-search");

  form.addEventListener("submit", event => {
    event.preventDefault();
    searchAndRender(input.value.trim() || MET_DEFAULT_QUERY);
  });

  input.addEventListener("input", () => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      searchAndRender(input.value.trim() || MET_DEFAULT_QUERY);
    }, 500);
  });

  clear.addEventListener("click", () => {
    input.value = "";
    searchAndRender(MET_DEFAULT_QUERY);
  });
}

document.addEventListener("DOMContentLoaded", init);
