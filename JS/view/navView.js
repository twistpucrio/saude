const NavView = (() => {
    
    // Show error messages
    const displayError = (message) => {
        document.getElementById('details').innerHTML = `<p>${message}</p>`;
    };

    // Show list of hospitals
    const displayHospitalsNav = (hospitals) => {
        const displayHospitaisEncontrados = document.getElementById('displayHospitaisEncontrados');
        displayHospitaisEncontrados.innerHTML = ''; // Clear previous content
        hospitals.forEach(hospital => {
            displayHospitaisEncontrados.innerHTML += `
                <div id="hospital-${hospital.nome}" tabindex="0">
                    <h2>${hospital.nome}</h2>
                    <p><strong>Endereço:</strong> ${hospital.endereco}</p>
                </div>
                <div>
                    <button class="directon_nav">
                        <img src="img/icons/directions_white.svg" alt="">
                        <p>Como chegar</p>
                    </button>
                </div>
            `;
        });
    };

    // Show or hide location dropdown
    const alterarDropdown = (visible) => {
        const dropdown = document.getElementById('dropdown-localizacao');
        dropdown.style.display = visible ? 'block' : 'none';
    };

    // Update the input value
    const setInputValue = (value) => {
        document.getElementById('local').value = value;
    };


    return {
        displayError,
        displayHospitalsNav,
        alterarDropdown,
        setInputValue,
    };
})();