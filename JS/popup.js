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
        document.getElementById('checkboxes').style.display = "none";
    });

    btnFechaComoUsar.addEventListener("click", function() {
        mudarEstado("comoUsar");
        document.getElementById('checkboxes').style.display = "none";
    });

    btnEmergencia.addEventListener("click", function() {
        mudarEstado("emergencia");
        document.getElementById('checkboxes').style.display = "none";
    });

    btnFechaEmergencia.addEventListener("click", function() {
        mudarEstado("emergencia");
        document.getElementById('checkboxes').style.display = "none";
    });

    btnSobreNos.addEventListener("click", function() {
        mudarEstado("sobreNos");
        document.getElementById('checkboxes').style.display = "none";
    });

    btnFechaSobreNos.addEventListener("click", function() {
        mudarEstado("sobreNos");
        document.getElementById('checkboxes').style.display = "none";
    });
});