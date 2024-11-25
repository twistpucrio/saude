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

const navView = (() => {
   
    const displayError = (message) => {
        document.getElementById('details').innerHTML = `<p>${message}</p>`;
    };

    const displayHospitalsNav = (hospitals) => {
    document.getElementById('displayHospitaisEncontrados').innerHTML = ``;
    hospitals.forEach(hospital =>{
        document.getElementById('displayHospitaisEncontrados').innerHTML += `
            <div id="hospita-${hospital.nome}" tabindex="0">
                <h2>${hospital.nome}</h2>
                <p><strong>Endereço:</strong> ${hospital.endereco}</p>
            </div>
        `; 
    })
        
    };
    

    return {
        displayHospitalsNav,
        displayError
    };
})();

// Função para mostrar ou esconder o dropdown
function mostrarOpcoesLocalizacao() {
    const dropdown = document.getElementById('dropdown-localizacao');
    const inputLocal = document.getElementById('local');

    // Só exibe o dropdown se o campo estiver vazio
    if (inputLocal.value.trim() === "") {
        dropdown.style.display = 'block';
    }
}


// Função para ativar a geolocalização
function usarGeolocalizacao() {
    const dropdown = document.getElementById('dropdown-localizacao');
    dropdown.style.display = 'none';
    
    const botaoGeolocalizacao = document.getElementById('use-user-geolocation');
    botaoGeolocalizacao.click();
}

// Função para verificar se o input está vazio ou não
function verificarInput() {
    const inputLocal = document.getElementById('local');
    const dropdown = document.getElementById('dropdown-localizacao');
    
    // Se o campo de input não estiver vazio, o dropdown some
    if (inputLocal.value.trim() !== "") {
        dropdown.style.display = 'none';
    }
    else{
        // Caso contrário, ele permanece visível
        dropdown.style.display = 'block';
    }
}

// Esconde a lista suspensa quando o usuário clica fora dela
document.addEventListener('click', function(event) {
    const dropdown = document.getElementById('dropdown-localizacao');
    const inputLocal = document.getElementById('local');

    if (!inputLocal.contains(event.target) && !dropdown.contains(event.target)) {
        dropdown.style.display = 'none';
    }
});


// Verifica o estado do input sempre que o usuário digitar algo
document.getElementById('local').addEventListener('input', function() {
    verificarInput();
});

// Exibe o dropdown ao clicar no input, mas só se o input estiver vazio
document.getElementById('local').addEventListener('click', function() {
    mostrarOpcoesLocalizacao();
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
