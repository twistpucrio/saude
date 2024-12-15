
const NavView = (() => {
    
    // Exibe uma mensagem de erro na área de detalhes
    const displayError = (message) => {
        const detailsElement = document.getElementById('details');
        if (detailsElement) {
            detailsElement.innerHTML = `<p>${message}</p>`;
        } else {
            console.error("Elemento 'details' não encontrado.");
        }
    };



    // Exibe a lista de hospitais na navegação lateral
    const displayHospitalsNav = (hospitals, handleHospitalNavClick) => {
        const displayHospitaisEncontrados = document.getElementById('displayHospitaisEncontrados');
        
        if (!displayHospitaisEncontrados) {
            console.error("Elemento 'displayHospitaisEncontrados' não encontrado.");
            return;
        }

       
        // Limpa os hospitais anteriores
        displayHospitaisEncontrados.innerHTML = '';

        // Adiciona os hospitais
        hospitals.forEach((hospital, index) => {
            const hospitalElement = document.createElement('div');
            hospitalElement.className = 'hospital-info';
            hospitalElement.tabIndex = 0;
            hospitalElement.id = `hospital-${index}`; // Evita IDs duplicados
            hospitalElement.innerHTML = `
                <h2>${hospital.nome}</h2>
                <p><strong>Endereço:</strong> ${hospital.endereco}</p>
            `;

            // Adiciona evento de clique
            hospitalElement.addEventListener('click', () => {
                console.log(`Clicado no hospital: ${hospital.nome}`);
                MapView.handleHospitalNavClick(hospital.id); // Chama a função recebida

            });

            displayHospitaisEncontrados.appendChild(hospitalElement);
        });
    };

    // Mostra ou esconde o dropdown de localização
    const alterarDropdown = (visible) => {
        const dropdown = document.getElementById('dropdown-localizacao');
        if (dropdown) {
            dropdown.style.display = visible ? 'block' : 'none';
        } else {
            console.error("Elemento 'dropdown-localizacao' não encontrado.");
        }
    };

    // Atualiza o valor do campo de entrada de texto
    const setInputValue = (value) => {
        const input = document.getElementById('local');
        if (input) {
            input.value = value;
        } else {
            console.error("Elemento 'local' não encontrado.");
        }
    };

    return {
        displayError,
        displayHospitalsNav,
        alterarDropdown,
        setInputValue,
    };
})();

