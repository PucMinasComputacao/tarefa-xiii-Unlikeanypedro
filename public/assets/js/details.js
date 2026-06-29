async function renderDetails() {
  const container = document.getElementById("details-root");
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) {
    container.innerHTML = `<div class="details-not-found"><p>Nenhuma obra foi selecionada.</p><a href="index.html" class="btn btn-primary">Voltar</a></div>`;
    return;
  }

  container.innerHTML = "<p>Carregando detalhes da obra...</p>";

  let art;
  try {
    art = await getMetObject(id);
  } catch (error) {
    container.innerHTML = `<div class="details-not-found"><p>Obra nao encontrada no Metropolitan Museum.</p><a href="index.html" class="btn btn-primary">Voltar</a></div>`;
    return;
  }

  const user = getLoggedUser();
  const favorites = user ? await getUserFavorites(user.id) : [];
  const isFavorite = favorites.some(fav => Number(fav.artworkId) === Number(art.objectID));

  document.title = `${art.title} - Artfinder`;

  container.innerHTML = `
    <div class="details-back"><a href="index.html" class="back-link">Voltar</a></div>
    <div class="details-layout">
      <div class="details-image-col">
        <div class="details-image-frame"><img src="${art.image}" alt="${art.title}"></div>
      </div>
      <div class="details-info-col">
        <span class="details-category">${art.department || "Sem departamento"}</span>
        <h1 class="details-title">${art.title}</h1>
        <p class="details-artist">${art.artist}</p>
        <button class="favorite-button details-favorite ${isFavorite ? "active" : ""}" type="button">
          ${isFavorite ? "&hearts; Favorito" : "&#9825; Favoritar"}
        </button>
        <p class="details-description">${art.creditLine || art.repository || "Descricao nao disponivel."}</p>
        <dl class="details-meta">
          <div class="meta-row"><dt>Ano</dt><dd>${art.objectDate || "Nao informado"}</dd></div>
          <div class="meta-row"><dt>Departamento</dt><dd>${art.department || "Nao informado"}</dd></div>
          <div class="meta-row"><dt>Cultura</dt><dd>${art.culture || "Nao informado"}</dd></div>
          <div class="meta-row"><dt>Pais</dt><dd>${art.country || "Nao informado"}</dd></div>
          <div class="meta-row"><dt>Material</dt><dd>${art.medium || "Nao informado"}</dd></div>
          <div class="meta-row"><dt>Dimensoes</dt><dd>${art.dimensions || "Nao informado"}</dd></div>
        </dl>
        <div class="details-tags">${art.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}</div>
      </div>
    </div>
  `;

  const favoriteButton = container.querySelector(".details-favorite");
  favoriteButton.addEventListener("click", async () => {
    const active = await toggleFavorite(art.objectID);
    if (getLoggedUser()) {
      favoriteButton.classList.toggle("active", active);
      favoriteButton.innerHTML = active ? "&hearts; Favorito" : "&#9825; Favoritar";
    }
  });
}

document.addEventListener("DOMContentLoaded", renderDetails);
