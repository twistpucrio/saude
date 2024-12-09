const HospitalDetailsView = (() => {
    const displayHospitalDetails = (hospital) => {
        document.getElementById('details').innerHTML = `
            <h2>${hospital.nome}</h2>
            <p><strong>Endereço:</strong> ${hospital.endereco}</p>
            <p><strong>Bairro:</strong> ${hospital.bairro.join(", ")}</p>
            <p><strong>Procedimentos:</strong> ${hospital.procedimentos.join(", ")}</p>
            <p><strong>Descrição:</strong> ${hospital.descricao}</p>

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
