const apiKey = "59c18f90196bcf3950d1d680442f86df"; // Coloque aqui sua chave da API-Football
const url = `https://v3.football.api-sports.io/fixtures?team=176&next=1`; // ID 176 = Palmeiras

fetch(url, {
    headers: { "x-apisports-key": apiKey }
})
.then(res => res.json())
.then(data => {
    if (!data.response || data.response.length === 0) {
        document.getElementById("erro").textContent = "Nenhum jogo encontrado.";
        return;
    }

    const jogo = data.response[0];
    const home = jogo.teams.home;
    const away = jogo.teams.away;
    const dataJogo = new Date(jogo.fixture.date);

    document.getElementById("homeTeam").textContent = home.name;
    document.getElementById("awayTeam").textContent = away.name;
    document.getElementById("homeLogo").src = home.logo;
    document.getElementById("awayLogo").src = away.logo;
    document.getElementById("data").textContent = dataJogo.toLocaleString("pt-BR");
    document.getElementById("local").textContent = jogo.fixture.venue.name;

    // Contagem regressiva
    function atualizarContagem() {
        const agora = new Date();
        const diff = dataJogo - agora;

        if (diff <= 0) {
            document.querySelector(".countdown").innerHTML = "O jogo já começou!";
            return;
        }

        const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutos = Math.floor((diff / (1000 * 60)) % 60);
        const segundos = Math.floor((diff / 1000) % 60);

        document.getElementById("dias").textContent = dias;
        document.getElementById("horas").textContent = horas;
        document.getElementById("minutos").textContent = minutos;
        document.getElementById("segundos").textContent = segundos;
    }

    setInterval(atualizarContagem, 1000);
    atualizarContagem();
})
.catch(err => {
    console.error("Erro ao buscar dados:", err);
    document.getElementById("erro").textContent = "Erro ao carregar dados do próximo jogo.";
});
