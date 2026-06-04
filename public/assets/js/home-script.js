
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

// ── HOME PAGE: render artwork cards ──────────────────────────────────────────
function renderCards() {
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
document.addEventListener("DOMContentLoaded", () => {
  initNavToggle();
  renderCards();
});