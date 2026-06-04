// ── FETCH SINGLE ARTWORK FROM JSON SERVER ───────────────────────────────────
async function fetchArtwork(id) {
  try {
    const response = await fetch(`http://localhost:3000/artworks/${id}`);
    if (!response.ok) throw new Error("Obra não encontrada");
    return await response.json();
  } catch (error) {
    console.error("Erro:", error);
    return null;
  }
}

// ── DETAILS PAGE: render single artwork ──────────────────────────────────────
async function renderDetails() {
  const container = document.getElementById("details-root");
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) {
    container.innerHTML = `
      <div class="details-not-found">
        <p>Nenhuma obra foi selecionada.</p>
        <a href="index.html" class="btn btn-primary">← Voltar à galeria</a>
      </div>`;
    return;
  }

  const art = await fetchArtwork(id);

  if (!art) {
    container.innerHTML = `
      <div class="details-not-found">
        <p>Obra não encontrada.</p>
        <a href="index.html" class="btn btn-primary">← Voltar à galeria</a>
      </div>`;
    return;
  }

  document.title = `${art.title} — Artfinder`;

  container.innerHTML = `
    <div class="details-back">
      <a href="index.html" class="back-link">← Galeria</a>
    </div>

    <div class="details-layout">
      <div class="details-image-col">
        <div class="details-image-frame">
          <img src="${art.image}" alt="${art.title}" />
        </div>

      </div>

      <div class="details-info-col">
        <span class="details-category">${art.category}</span>
        <h1 class="details-title">${art.title}</h1>
        <p class="details-artist">${art.artist}</p>

        <p class="details-description">${art.descricaoCompleta}</p>

        <dl class="details-meta">
          <div class="meta-row">
            <dt>Ano</dt>
            <dd>${art.year}</dd>
          </div>
          <div class="meta-row">
            <dt>Técnica</dt>
            <dd>${art.medium}</dd>
          </div>
          <div class="meta-row">
            <dt>Preço</dt>
            <dd>R$ ${art.preco.toLocaleString('pt-BR')}</dd>
          </div>
        </dl>

        <div class="details-tags">
          ${art.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}
        </div>
      </div>
    </div>
  `;
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

// ── INIT: DETAILS PAGE ONLY ───────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  initNavToggle();
  renderDetails();
});