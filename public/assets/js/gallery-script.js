// ── SHARED ARTWORKS DATA ─────────────────────────────────────────────────────
const artworks = [
  {
    "id": 1,
    "title": "Starry Night",
    "artist": "Vincent van Gogh",
    "year": 1889,
    "category": "Post-Impressionism",
    "medium": "Oil on canvas",
    "description": "Uma obra-prima noturna que captura a essência da natureza em movimento.",
    "thumbnail": "https://picsum.photos/id/25/300/300",
    "image": "https://picsum.photos/id/25/800/600",
    "tags": ["impressionismo", "noite", "céu"]
  },
  {
    "id": 2,
    "title": "The Persistence of Memory",
    "artist": "Salvador Dalí",
    "year": 1931,
    "category": "Surrealism",
    "medium": "Oil on canvas",
    "description": "Uma exploração surrealista do tempo e da memória com relógios derretidos.",
    "thumbnail": "https://picsum.photos/id/27/300/300",
    "image": "https://picsum.photos/id/27/800/600",
    "tags": ["surrealismo", "tempo", "abstrato"]
  },
  {
    "id": 3,
    "title": "Girl with a Pearl Earring",
    "artist": "Johannes Vermeer",
    "year": 1665,
    "category": "Dutch Golden Age",
    "medium": "Oil on canvas",
    "description": "Um retrato clássico famoso pela pérola brilhante e o olhar misterioso.",
    "thumbnail": "https://picsum.photos/id/28/300/300",
    "image": "https://picsum.photos/id/28/800/600",
    "tags": ["retrato", "clássico", "pérola"]
  },
  {
    "id": 4,
    "title": "The Great Wave",
    "artist": "Katsushika Hokusai",
    "year": 1831,
    "category": "Ukiyo-e",
    "medium": "Woodblock print",
    "description": "Uma icônica representação da Grande Onda de Kanagawa com o Monte Fuji ao fundo.",
    "thumbnail": "https://picsum.photos/id/29/300/300",
    "image": "https://picsum.photos/id/29/800/600",
    "tags": ["japonês", "onda", "natureza"]
  },
  {
    "id": 5,
    "title": "American Gothic",
    "artist": "Grant Wood",
    "year": 1930,
    "category": "American Regionalism",
    "medium": "Oil on beaverboard",
    "description": "Uma pintura que captura o espírito do rural americano com uma abordagem única.",
    "thumbnail": "https://picsum.photos/id/30/300/300",
    "image": "https://picsum.photos/id/30/800/600",
    "tags": ["americano", "rural", "expressão"]
  },
  {
    "id": 6,
    "title": "American Gothic",
    "artist": "Grant Wood",
    "year": 1930,
    "category": "American Regionalism",
    "medium": "Oil on beaverboard",
    "description": "Uma pintura que captura o espírito do rural americano com uma abordagem única.",
    "thumbnail": "https://picsum.photos/id/30/300/300",
    "image": "https://picsum.photos/id/30/800/600",
    "tags": ["americano", "rural", "expressão"]
  },
  {
    "id": 7,
    "title": "The Raft of the Medusa",
    "artist": "Théodore Géricault",
    "year": 1819,
    "category": "Romanticism",
    "medium": "Oil on canvas",
    "description": "Uma obra dramática que retrata sobreviventes em um navio à deriva no oceano.",
    "thumbnail": "https://picsum.photos/id/31/300/300",
    "image": "https://picsum.photos/id/31/800/600",
    "tags": ["drama", "mar", "humano"]
  }
];

// ── RENDER GALLERY ────────────────────────────────────────────────────────────
function renderGallery(filter = "all") {
  const container = document.getElementById("gallery-grid");

  if (!container) return;

  container.innerHTML = "";

  const filteredArtworks =
    filter === "all"
      ? artworks
      : artworks.filter(art => art.category === filter);

  filteredArtworks.forEach((art, index) => {
    const card = document.createElement("article");

    card.className = "gallery-card";

    card.style.animationDelay = `${index * 0.08}s`;

    // altura aleatória estilo pinterest
    const randomHeight =
      250 + Math.floor(Math.random() * 300);

    card.innerHTML = `
      <a
        href="../details.html?id=${art.id}"
        class="gallery-card-link"
        aria-label="Ver detalhes de ${art.title}"
      >
        <div class="gallery-card-image">

          <img
            src="${art.image}"
            alt="${art.title}"
            loading="lazy"
            style="height:${randomHeight}px;"
          />

          <div class="gallery-card-overlay">
            <span class="gallery-card-cta">
              Ver detalhes →
            </span>
          </div>

        </div>
      </a>
    `;

    container.appendChild(card);
  });

  // recalcular masonry depois das imagens carregarem
  imagesLoaded(container, () => {
    resizeGridItems();
  });
}
// ── RENDER FILTER BUTTONS ─────────────────────────────────────────────────────
function renderFilterButtons() {
  const filterContainer = document.getElementById("filter-buttons");
  if (!filterContainer) return;

  // Obter categorias únicas
  const categories = [...new Set(artworks.map(art => art.category))].sort();

  // Limpar e renderizar botões
  filterContainer.innerHTML = '<button class="filter-btn active" data-filter="all">Todas</button>';

  categories.forEach(category => {
    const btn = document.createElement("button");
    btn.className = "filter-btn";
    btn.dataset.filter = category;
    btn.textContent = category;
    filterContainer.appendChild(btn);
  });

  // Adicionar event listeners
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      // Remover classe active de todos
      document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      // Adicionar classe active ao clicado
      btn.classList.add("active");
      // Renderizar galeria filtrada
      renderGallery(btn.dataset.filter);
    });
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

// ── RENDEZIRAR O GRID ───────────────────────────────────────────────────────
function resizeGridItems() {
  const grid = document.querySelector(".gallery-grid");

  if (!grid) return;

  const rowHeight = parseInt(
    window
      .getComputedStyle(grid)
      .getPropertyValue("grid-auto-rows")
  );

  const rowGap = parseInt(
    window
      .getComputedStyle(grid)
      .getPropertyValue("gap")
  );

  grid.querySelectorAll(".gallery-card").forEach(item => {

    const content =
      item.querySelector(".gallery-card-link");

    const contentHeight =
      content.getBoundingClientRect().height;

    const rowSpan = Math.ceil(
      (contentHeight + rowGap) /
      (rowHeight + rowGap)
    );

    item.style.gridRowEnd = `span ${rowSpan}`;
  });
}

// ── INIT ──────────────────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {

  initNavToggle();

  renderFilterButtons();

  renderGallery();

  window.addEventListener(
    "resize",
    resizeGridItems
  );

});