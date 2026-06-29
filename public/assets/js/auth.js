async function handleLogin(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const status = document.getElementById("auth-status");
  const login = form.login.value.trim();
  const senha = form.senha.value.trim();

  try {
    const users = await requestJson(`/usuarios?login=${encodeURIComponent(login)}&senha=${encodeURIComponent(senha)}`);
    if (!users.length) {
      status.textContent = "Login ou senha invalidos.";
      status.className = "form-status error";
      return;
    }

    setLoggedUser(users[0]);
    window.location.href = "index.html";
  } catch (error) {
    status.textContent = "Nao foi possivel entrar. Verifique o JSON Server.";
    status.className = "form-status error";
  }
}

async function handleSignup(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const status = document.getElementById("auth-status");
  const user = {
    login: form.login.value.trim(),
    senha: form.senha.value.trim(),
    nome: form.nome.value.trim(),
    email: form.email.value.trim(),
    admin: false
  };

  try {
    const existing = await requestJson(`/usuarios?login=${encodeURIComponent(user.login)}`);
    if (existing.length) {
      status.textContent = "Este login ja esta em uso.";
      status.className = "form-status error";
      return;
    }

    const created = await requestJson("/usuarios", {
      method: "POST",
      body: JSON.stringify(user)
    });
    setLoggedUser(created);
    window.location.href = "index.html";
  } catch (error) {
    status.textContent = "Nao foi possivel cadastrar o usuario.";
    status.className = "form-status error";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const signupForm = document.getElementById("signup-form");

  if (loginForm) loginForm.addEventListener("submit", handleLogin);
  if (signupForm) signupForm.addEventListener("submit", handleSignup);
});
