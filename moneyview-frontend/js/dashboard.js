const API_TRANSACOES = "http://localhost:8080/transacoes";
const API_USUARIOS = "http://localhost:8080/usuarios";

const usuarioId = localStorage.getItem("usuarioId");

let transacaoEditandoId = null;

if (!usuarioId) {
    window.location.href = "login.html";
}

document.getElementById("formTransacao")
.addEventListener("submit", async function (event) {

    event.preventDefault();

    const descricao = document.getElementById("descricao").value;
    const valor = document.getElementById("valor").value;
    const tipo = document.getElementById("tipo").value;
    const data = document.getElementById("data").value;

    const transacao = {
        descricao: descricao,
        valor: parseFloat(valor),
        tipo: tipo,
        data: data
    };

    if (transacaoEditandoId) {

        // 🔄 UPDATE
        await fetch(`${API_TRANSACOES}/${transacaoEditandoId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(transacao)
        });

        transacaoEditandoId = null;
        document.querySelector("#formTransacao button").textContent = "Adicionar";

    } else {

        // ➕ CREATE
        await fetch(API_TRANSACOES, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(transacao)
        });
    }

    this.reset();
    carregarTransacoes();
});

function editarTransacao(transacao) {

    document.getElementById("descricao").value = transacao.descricao;
    document.getElementById("valor").value = transacao.valor;
    document.getElementById("tipo").value = transacao.tipo;
    document.getElementById("data").value = transacao.data;

    transacaoEditandoId = transacao.id;

    document.querySelector("#formTransacao button").textContent = "Atualizar";
}

function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

async function carregarTransacoes() {

    const response = await fetch(API_TRANSACOES);
    const transacoes = await response.json();

    const lista = document.getElementById("listaTransacoes");
    lista.innerHTML = "";

    const dataInicio = document.getElementById("dataInicio").value;
    const dataFim = document.getElementById("dataFim").value;
    const filtroTipo = document.getElementById("filtroTipo").value;

    let totalGanhos = 0;
    let totalDespesas = 0;

    // 🔹 1️⃣ CALCULA RESUMO GERAL (sem filtro)
    transacoes
        .filter(t => t.usuario.id == usuarioId)
        .forEach(t => {
            const valor = parseFloat(t.valor);

            if (t.tipo === "GANHO") {
                totalGanhos += valor;
            } else {
                totalDespesas += valor;
            }
        });

    const saldo = totalGanhos - totalDespesas;

    document.getElementById("totalGanhos").textContent =
        formatarMoeda(totalGanhos);

    document.getElementById("totalDespesas").textContent =
        formatarMoeda(totalDespesas);

    document.getElementById("saldo").textContent =
        formatarMoeda(saldo);

    // 🔹 2️⃣ FILTRA APENAS PARA EXIBIÇÃO
    transacoes
        .filter(t => t.usuario.id == usuarioId)
        .filter(t => {

            if (filtroTipo !== "TODOS" && t.tipo !== filtroTipo) {
                return false;
            }

            if (dataInicio && t.data < dataInicio) return false;
            if (dataFim && t.data > dataFim) return false;

            return true;
        })
        .forEach(t => {

            const valor = parseFloat(t.valor);

            const li = document.createElement("li");

            li.innerHTML = `
                ${t.descricao} - ${formatarMoeda(valor)} (${t.tipo}) - ${t.data}
                <div>
                    <button onclick='editarTransacao(${JSON.stringify(t)})'>Editar</button>
                    <button onclick="deletarTransacao(${t.id})">Excluir</button>
                </div>
            `;

            li.style.color = t.tipo === "GANHO" ? "green" : "red";
            li.style.display = "flex";
            li.style.justifyContent = "space-between";
            li.style.alignItems = "center";

            lista.appendChild(li);
        });
}


async function deletarTransacao(id) {

    const confirmar = confirm("Tem certeza que deseja excluir esta transação?");

    if (!confirmar) return;

    await fetch(`${API_TRANSACOES}/${id}`, {
        method: "DELETE"
    });

    carregarTransacoes(); // atualiza lista
}

function logout() {
    localStorage.removeItem("usuarioId");
    window.location.href = "login.html";
}

carregarTransacoes();
