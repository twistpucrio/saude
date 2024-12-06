window.addEventListener("load", function() {

    let overlay = document.querySelector(".overlay");
    let btnComoUsar = document.querySelector("#btnComoUsar");
    let btnEmergencia = document.querySelector("#btnEmergencia");
    let btnSobreNos = document.querySelector("#btnSobreNos");

    let btnFechaComoUsar = document.querySelector("#btnFechaComoUsar");
    let btnFechaEmergencia = document.querySelector("#btnFechaEmergencia");
    let btnFechaSobreNos = document.querySelector("#btnFechaSobreNos");

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

    btnComoUsar.addEventListener("click", function() {
        mudarEstado("comoUsar");
    });

    btnFechaComoUsar.addEventListener("click", function() {
        mudarEstado("comoUsar");
    });

    btnEmergencia.addEventListener("click", function() {
        mudarEstado("emergencia");
    });

    btnFechaEmergencia.addEventListener("click", function() {
        mudarEstado("emergencia");
    });

    btnSobreNos.addEventListener("click", function() {
        mudarEstado("sobreNos");
    });

    btnFechaSobreNos.addEventListener("click", function() {
        mudarEstado("sobreNos");
    });
});