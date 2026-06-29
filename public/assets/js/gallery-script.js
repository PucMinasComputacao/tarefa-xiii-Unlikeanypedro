let artworks = [];

async function loadGalleryData() {
  const container = document.getElementById("gallery-grid");
  if (container) container.innerHTML = "<p>Carregando galeria do Metropolitan Museum...</p>";
  try {
    artworks = await searchMetObjects(MET_DEFAULT_QUERY, 30);
  } catch (error) {
    artworks = [];
    if (container) container.innerHTML = "<p>Erro ao carregar galeria do Metropolitan Museum.</p>";
  }
}

function renderGallery(filter = "all") {
  const container = document.getElementById("gallery-grid");
  if (!container) return;

  const filteredArtworks = filter === "all" ? artworks : artworks.filter(art => (art.department || art.category) === filter);
  container.innerHTML = filteredArtworks.map((art, index) => {
    const randomHeight = 250 + Math.floor(Math.random() * 300);
    return `
      <article class="gallery-card" style="animation-delay:${index * 0.08}s">
        <a href="../details.html?id=${art.objectID}" class="gallery-card-link" aria-label="Ver detalhes de ${art.title}">
          <div class="gallery-card-image">
            <img src="${art.image}" alt="${art.title}" loading="lazy" style="height:${randomHeight}px;">
            <div class="gallery-card-overlay"><span class="gallery-card-cta">Ver detalhes -></span></div>
          </div>
        </a>
      </article>
    `;
  }).join("");

  imagesLoaded(container, () => resizeGridItems());
}

function renderFilterButtons() {
  const filterContainer = document.getElementById("filter-buttons");
  if (!filterContainer) return;

  const categories = [...new Set(artworks.map(art => art.department || art.category))].sort();
  filterContainer.innerHTML = '<button class="filter-btn active" data-filter="all">Todas</button>';

  categories.forEach(category => {
    const btn = document.createElement("button");
    btn.className = "filter-btn";
    btn.dataset.filter = category;
    btn.textContent = category;
    filterContainer.appendChild(btn);
  });

  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderGallery(btn.dataset.filter);
    });
  });
}

function resizeGridItems() {
  const grid = document.querySelector(".gallery-grid");
  if (!grid) return;

  const rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue("grid-auto-rows"));
  const rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue("gap"));

  grid.querySelectorAll(".gallery-card").forEach(item => {
    const content = item.querySelector(".gallery-card-link");
    const contentHeight = content.getBoundingClientRect().height;
    const rowSpan = Math.ceil((contentHeight + rowGap) / (rowHeight + rowGap));
    item.style.gridRowEnd = `span ${rowSpan}`;
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  await loadGalleryData();
  renderFilterButtons();
  renderGallery();
  window.addEventListener("resize", resizeGridItems);
});
