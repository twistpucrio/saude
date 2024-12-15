window.addEventListener("load", function() {

    let overlay = document.querySelector(".overlay");
    let btnRegra = document.querySelector("#btnRegras");
    let btnJogabilidade = document.querySelector("#btnJogabilidades");
    let btnFonte = document.querySelector("#btnFontes");

    let btnFecharRegras = document.querySelector("#btnFechaRegra");
    let btnFecharJogabilidades = document.querySelector("#btnFechaJogabilidade");
    let btnFecharFontes = document.querySelector("#btnFechaFonte");

    function mudarEstado(el) {
        var display = document.getElementById(el).style.display;
        if (display == "none") {
            document.getElementById(el).style.display = 'block';
            overlay.style.display = "block";  // Mostra o overlay quando o popup for exibido
        } else {
            document.getElementById(el).style.display = 'none';
            overlay.style.display = "none";  // Esconde o overlay quando o popup for fechado
        }
    }

    btnRegra.addEventListener("click", function() {
        mudarEstado("regras");
    });

    btnFecharRegras.addEventListener("click", function() {
        mudarEstado("regras");
    });

    btnJogabilidade.addEventListener("click", function() {
        mudarEstado("jogabilidade");
    });

    btnFecharJogabilidades.addEventListener("click", function() {
        mudarEstado("jogabilidade");
    });

    btnFonte.addEventListener("click", function() {
        mudarEstado("fontes");
    });

    btnFecharFontes.addEventListener("click", function() {
        mudarEstado("fontes");
    });
});
