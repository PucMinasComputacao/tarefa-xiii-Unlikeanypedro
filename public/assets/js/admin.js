async function renderUsers() {
  const table = document.getElementById("admin-users");
  if (!table) return;

  const users = await requestJson("/usuarios");
  table.innerHTML = users.map(user => `
    <tr>
      <td>${user.nome}</td>
      <td>${user.login}</td>
      <td>${user.email}</td>
      <td>${user.admin ? "Sim" : "Nao"}</td>
      <td class="table-actions">
        <button class="btn btn-secondary admin-toggle" type="button" data-id="${user.id}" data-admin="${user.admin}">Alternar admin</button>
      </td>
    </tr>
  `).join("");

  table.querySelectorAll(".admin-toggle").forEach(button => {
    button.addEventListener("click", async () => {
      const user = users.find(item => String(item.id) === String(button.dataset.id));
      await requestJson(`/usuarios/${user.id}`, {
        method: "PATCH",
        body: JSON.stringify({ admin: !user.admin })
      });
      renderUsers();
    });
  });
}

async function renderSavedFavorites() {
  const table = document.getElementById("admin-favorites");
  if (!table) return;

  const [users, favorites] = await Promise.all([
    requestJson("/usuarios"),
    requestJson("/favoritos")
  ]);

  table.innerHTML = favorites.map(favorite => {
    const user = users.find(item => String(item.id) === String(favorite.usuarioId));
    return `
      <tr>
        <td>${user ? user.login : favorite.usuarioId}</td>
        <td>${favorite.artworkId}</td>
        <td class="table-actions">
          <button class="btn btn-danger favorite-delete" type="button" data-id="${favorite.id}">Excluir</button>
        </td>
      </tr>
    `;
  }).join("");

  table.querySelectorAll(".favorite-delete").forEach(button => {
    button.addEventListener("click", async () => {
      await fetch(`${API_URL}/favoritos/${button.dataset.id}`, { method: "DELETE" });
      renderSavedFavorites();
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  if (!requireAdmin()) return;
  renderUsers();
  renderSavedFavorites();
});
