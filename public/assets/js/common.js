const API_URL = "http://localhost:3000";
const SESSION_KEY = "usuarioLogado";

function getLoggedUser() {
  const rawUser = sessionStorage.getItem(SESSION_KEY);
  return rawUser ? JSON.parse(rawUser) : null;
}

function setLoggedUser(user) {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

function clearLoggedUser() {
  sessionStorage.removeItem(SESSION_KEY);
}

function requireLogin() {
  const user = getLoggedUser();
  if (!user) {
    window.location.href = "login.html";
    return null;
  }
  return user;
}

function requireAdmin() {
  const user = requireLogin();
  if (!user) return null;
  if (!user.admin) {
    window.location.href = "index.html";
    return null;
  }
  return user;
}

function getPagePrefix() {
  return window.location.pathname.includes("/gallery/") ? "../" : "";
}

function initNavToggle() {
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("Links-nav");
  if (toggle && links) {
    toggle.addEventListener("click", () => links.classList.toggle("open"));
  }
}

function renderMenu() {
  const links = document.getElementById("Links-nav");
  if (!links) return;

  const user = getLoggedUser();
  const prefix = getPagePrefix();
  const items = [
    `<li><a href="${prefix}index.html">Home</a></li>`,
    `<li><a href="${prefix}gallery/gallery.html">Galeria</a></li>`
  ];

  if (user) {
    items.push(`<li><a href="${prefix}favoritos.html">Favoritos</a></li>`);
    if (user.admin) {
      items.push(`<li><a href="${prefix}admin.html">Cadastro</a></li>`);
    }
    items.push(`<li><button class="nav-action" id="logoutButton" type="button">Sair</button></li>`);
  } else {
    items.push(`<li><a href="${prefix}login.html">Login</a></li>`);
  }

  links.innerHTML = items.join("");

  const logoutButton = document.getElementById("logoutButton");
  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      clearLoggedUser();
      window.location.href = `${prefix}index.html`;
    });
  }
}

async function requestJson(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options
  });

  if (!response.ok) throw new Error("Erro na requisicao");
  return response.json();
}

async function getUserFavorites(userId) {
  if (!userId) return [];
  return requestJson(`/favoritos?usuarioId=${userId}`);
}

async function toggleFavorite(artworkId) {
  const user = getLoggedUser();
  if (!user) {
    window.location.href = "login.html";
    return false;
  }

  const favorites = await getUserFavorites(user.id);
  const current = favorites.find(fav => Number(fav.artworkId) === Number(artworkId));

  if (current) {
    await fetch(`${API_URL}/favoritos/${current.id}`, { method: "DELETE" });
    return false;
  }

  await requestJson("/favoritos", {
    method: "POST",
    body: JSON.stringify({ usuarioId: user.id, artworkId: Number(artworkId) })
  });
  return true;
}

document.addEventListener("DOMContentLoaded", () => {
  initNavToggle();
  renderMenu();
});
