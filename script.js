let cardContainer = document.querySelector(".card-container");
let campoBusca = document.querySelector("main input");
let dados = []

async function iniciarBusca() {
    if (dados.length === 0) {
        try {
            let resposta = await fetch("data.json");
            dados = await resposta.json();
        } catch (error) {
            console.error("Erro ao buscar os dados: ", error);
            return
        }
    }

    const termoBusca = campoBusca.value.toLowerCase();
    const dadosFiltrados = dados.filter(dado =>
        dado.nome.toLowerCase().includes(termoBusca) ||
        dado.descricao.toLowerCase().includes(termoBusca)
    );

    renderizarCards(dadosFiltrados);
}

function renderizarCards(dados) {
    cardContainer.innerHTML = "";

    if (dados.length === 0 ) {
        cardContainer.innerHTML = "<p>No artists found.</p>";
        return;
    }

    for (let dado of dados) {
        let article = document.createElement("article");
        article.classList.add("card");
        article.innerHTML = `
            <h2>${dado.nome}</h2>
            <p>${dado.descricao}</p>
            <a href="${dado.link}" target="_blank">Spotify</a>
        `

        cardContainer.appendChild(article);
    }
}