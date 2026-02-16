const API = "http://localhost:8080/usuarios";

document.getElementById("formCadastro")
.addEventListener("submit", async (e) => {
    e.preventDefault();

    const usuario = {
        nome: nome.value,
        email: email.value,
        senha: senha.value
    };

    const response = await fetch(API, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(usuario)
    });

    if (!response.ok) {
        alert("Erro ao cadastrar");
        return;
    }

    alert("Conta criada!");
    window.location.href = "login.html";
});
