async function renderFavorites() {
  const user = requireLogin();
  const container = document.getElementById("favorites-grid");
  const empty = document.getElementById("favorites-empty");
  if (!user || !container) return;

  try {
    const favorites = await getUserFavorites(user.id);
    container.innerHTML = "<p>Carregando favoritos do Metropolitan Museum...</p>";
    const favoriteArtworks = await getMetObjectsByIds(favorites.map(fav => fav.artworkId), 40);

    empty.hidden = favoriteArtworks.length > 0;
    container.innerHTML = favoriteArtworks.map(art => `
      <article class="artwork-card">
        <button class="favorite-button active" type="button" data-id="${art.objectID}" aria-label="Remover favorito">&hearts;</button>
        <a href="details.html?id=${art.objectID}" class="card-link">
          <div class="card-image-wrap"><img src="${art.thumbnail}" alt="${art.title}" loading="lazy"></div>
          <div class="card-info">
            <span class="card-category">${art.department || art.category}</span>
            <h3 class="card-title">${art.title}</h3>
            <p class="card-artist">${art.artist} - ${art.year}</p>
            <p class="card-description">${art.description}</p>
          </div>
        </a>
      </article>
    `).join("");

    container.querySelectorAll(".favorite-button").forEach(button => {
      button.addEventListener("click", async () => {
        await toggleFavorite(button.dataset.id);
        renderFavorites();
      });
    });
  } catch (error) {
    empty.hidden = false;
    empty.textContent = "Nao foi possivel carregar seus favoritos.";
  }
}

document.addEventListener("DOMContentLoaded", renderFavorites);
