const HospitalDetailsView = (() => {
    const displayHospitalDetails = (hospital) => {
        document.getElementById('details').innerHTML = `
            <h2>${hospital.nome}</h2>
            <div id="det" aria-label="Detalhes do hospital">
            <p><strong>Endereço:</strong> ${hospital.endereco}</p><br>
            <p><strong>Bairro:</strong> ${hospital.bairro.join(", ")}</p><br>
            <p><strong>Procedimentos:</strong> ${hospital.procedimentos.join(", ")}</p><br>
            <p><strong>Descrição:</strong> ${hospital.descricao}</p>
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
