const API = "http://localhost:8080/usuarios";

document.getElementById("formLogin")
.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    const response = await fetch(API);
    const usuarios = await response.json();

    const usuario = usuarios.find(u => u.email === email && u.senha === senha);

    if (!usuario) {
        alert("Email ou senha inválidos");
        return;
    }

    localStorage.setItem("usuarioId", usuario.id);
    window.location.href = "dashboard.html";
});
