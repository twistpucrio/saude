var expanded = false;

function showCheckboxes(){
    var checkboxes = document.getElementById("checkboxes");
    if(!expanded){
        checkboxes.style.display = "block";
        expanded = true;
    }
    else{
        checkboxes.style.display = "none";
        expanded = false;
    }
}

function mostrarDetalhesHospital(hospitalId){
    console.log(`Detalhes do hospital ${hospitalId}`);
    HospitalDetailsController.loadDetails(hospitalId);
};

const navView = (() => {
   
    const displayError = (message) => {
        document.getElementById('details').innerHTML = `<p>${message}</p>`;
    };

    const displayHospitalsNav = (hospitals) => {
        const container = document.getElementById('displayHospitaisEncontrados');
        container.innerHTML = ``;
    
        hospitals.forEach(hospital => {
            const hospitalDiv = document.createElement('div');
            hospitalDiv.id = `hospital-${hospital.id}`;
            hospitalDiv.tabIndex = 0;
    
            hospitalDiv.innerHTML = `
                <h2>${hospital.nome}</h2>
                <p><strong>Endereço:</strong> ${hospital.endereco}</p>
            `;
    
            // Adicionar o evento de clique dinamicamente
            hospitalDiv.addEventListener('click', () => mostrarDetalhesHospital(hospital.id));
    
            container.appendChild(hospitalDiv);
        });
    };

    


    return {
        displayHospitalsNav,
        displayError,
    };
})();
// Exibir a lista de últimas localidades e a opção de geolocalização
function mostrarOpcoesLocalizacao() {
    const dropdown = document.getElementById('dropdown-localizacao');
    const ultimasLocalidades = getUltimasLocalidades();
    
    // Limpar as localidades anteriores exibidas
    const localidadesElement = dropdown.querySelectorAll('.ultima-localidade');
    localidadesElement.forEach(element => element.remove());

    // Adicionar dinamicamente as últimas localidades ao dropdown
    ultimasLocalidades.forEach(localidade => {
        const localDiv = document.createElement('div');
        localDiv.classList.add('ultima-localidade', 'opcao-localizacao');
        localDiv.textContent = localidade;
        localDiv.onclick = () => selecionarLocalidade(localidade);
        dropdown.appendChild(localDiv);
    });

    // Exibir o dropdown logo abaixo do input
    dropdown.style.display = 'block';
}


// Função para ativar a geolocalização
function usarGeolocalizacao() {
    const dropdown = document.getElementById('dropdown-localizacao');
    dropdown.style.display = 'none';
    
    const botaoGeolocalizacao = document.getElementById('use-user-geolocation');
    botaoGeolocalizacao.click();
}

// Esconde a lista suspensa quando o usuário clica fora dela
document.addEventListener('click', function(event) {
    const dropdown = document.getElementById('dropdown-localizacao');
    const inputLocal = document.getElementById('local');

    if (!inputLocal.contains(event.target) && !dropdown.contains(event.target)) {
        dropdown.style.display = 'none';
    }
});

// Função para salvar e recuperar as últimas localidades no localStorage
function salvarLocalidade(localidade) {
    let localidades = JSON.parse(localStorage.getItem('ultimasLocalidades')) || [];
    
    // Adiciona a nova localidade ao início da lista, sem duplicatas
    if (!localidades.includes(localidade)) {
        localidades.unshift(localidade);
    }

    // Limita o armazenamento a 5 localidades
    if (localidades.length > 5) {
        localidades.pop();
    }

    // Armazena novamente no localStorage
    localStorage.setItem('ultimasLocalidades', JSON.stringify(localidades));
}

function getUltimasLocalidades() {
    return JSON.parse(localStorage.getItem('ultimasLocalidades')) || [];
}

// Função para quando uma localidade é selecionada
function selecionarLocalidade(localidade) {
    const inputLocal = document.getElementById('local');
    inputLocal.value = localidade;
    salvarLocalidade(localidade);
}

document.getElementById('local').addEventListener('click', function() {
    mostrarOpcoesLocalizacao();
});
