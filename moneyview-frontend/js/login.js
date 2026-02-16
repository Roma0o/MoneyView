const API = "http://localhost:8080/usuarios/login";

document.getElementById("formLogin")
.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    const response = await fetch(API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            senha: senha
        })
    });

    if (!response.ok) {
        alert("Email ou senha inválidos");
        return;
    }

    const usuario = await response.json();

    localStorage.setItem("usuarioId", usuario.id);
    localStorage.setItem("usuarioNome", usuario.nome);

    window.location.href = "dashboard.html";
});
