// ── FETCH ARTWORKS FROM JSON SERVER ──────────────────────────────────────────
async function fetchItems() {
  try {
    const response = await fetch("http://localhost:3000/artworks");
    if (!response.ok) throw new Error("Erro ao buscar dados");
    return await response.json();
  } catch (error) {
    console.error("Erro:", error);
    const container = document.getElementById("artworks-grid");
    if (container) {
      container.innerHTML = '<p>Erro ao carregar obras. Verifique se o JSON Server está rodando.</p>';
    }
    return [];
  }
}

// ── HOME PAGE: render artwork cards ──────────────────────────────────────────
function renderCards(artworks) {
  const container = document.getElementById("artworks-grid");
  if (!container) return;

  container.innerHTML = "";

  artworks.forEach((art, index) => {
    const card = document.createElement("article");
    card.className = "artwork-card";
    card.style.animationDelay = `${index * 0.1}s`;

    card.innerHTML = `
      <a href="details.html?id=${art.id}" class="card-link" aria-label="Ver detalhes de ${art.title}">
        <div class="card-image-wrap">
          <img src="${art.thumbnail}" alt="${art.title}" loading="lazy" />
          <div class="card-overlay">
            <span class="card-cta">Ver obra →</span>
          </div>
        </div>
        <div class="card-info">
          <span class="card-category">${art.category}</span>
          <h3 class="card-title">${art.title}</h3>
          <p class="card-artist">${art.artist} · ${art.year}</p>
          <p class="card-description">${art.description}</p>
          <div class="card-tags">
            ${art.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}
          </div>
        </div>
      </a>
    `;

    container.appendChild(card);
  });
}

// ── NAV TOGGLE (mobile) ───────────────────────────────────────────────────────
function initNavToggle() {
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("Links-nav");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      links.classList.toggle("open");
    });
  }
}

// ── INIT: HOME PAGE ONLY ──────────────────────────────────────────────────────
async function init() {
  initNavToggle();
  const artworks = await fetchItems();
  renderCards(artworks);
}

document.addEventListener("DOMContentLoaded", init);