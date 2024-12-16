const HospitalDetailsView = (() => {
    const displayHospitalDetails = (hospital) => {
        document.getElementById('details').innerHTML = `
            <h2>${hospital.nome}</h2>
            <div id="det">
            <p><strong>Endereço:</strong> ${hospital.endereco}</p><br>
            <p><strong>Bairro:</strong> ${hospital.bairro.join(", ")}</p><br>
            <p><strong>Procedimentos:</strong> ${hospital.procedimentos.join(", ")}</p><br>
            </div>
            <img src="${hospital.imagem}" alt="">
        `;
    };

    const displayError = (message) => {
        document.getElementById('details').innerHTML = `<p>${message}</p>`;
    };

    return {
        displayHospitalDetails,
        displayError
    };
})();
