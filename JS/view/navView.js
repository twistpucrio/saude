// var expanded = false;

// function showCheckboxes(){
//     var checkboxes = document.getElementById("checkboxes");
//     if(!expanded){
//         checkboxes.style.display = "block";
//         expanded = true;
//     }
//     else{
//         checkboxes.style.display = "none";
//         expanded = false;
//     }
// }

// const navView = (() => {
   
//     const displayError = (message) => {
//         document.getElementById('details').innerHTML = `<p>${message}</p>`;
//     };

//     const displayHospitalsNav = (hospitals) => {
//     document.getElementById('displayHospitaisEncontrados').innerHTML = ``;
//     hospitals.forEach(hospital =>{
//         document.getElementById('displayHospitaisEncontrados').innerHTML += `
//             <div id="hospita-${hospital.nome}" tabindex="0">
//                 <h2>${hospital.nome}</h2>
//                 <p><strong>Endereço:</strong> ${hospital.endereco}</p>
//             </div>
//         `; 
//     })
        
//     };
    

//     return {
//         displayHospitalsNav,
//         displayError
//     };
// })();

// // Função para mostrar ou esconder o dropdown
// function mostrarOpcoesLocalizacao() {
//     const dropdown = document.getElementById('dropdown-localizacao');
//     const inputLocal = document.getElementById('local');

//     // Só exibe o dropdown se o campo estiver vazio
//     if (inputLocal.value.trim() === "") {
//         dropdown.style.display = 'block';
//     }
// }


// // Função para ativar a geolocalização
// function usarGeolocalizacao() {
//     const dropdown = document.getElementById('dropdown-localizacao');
//     dropdown.style.display = 'none';
    
//     const botaoGeolocalizacao = document.getElementById('use-user-geolocation');
//     botaoGeolocalizacao.click();
// }

// // Função para verificar se o input está vazio ou não
// function verificarInput() {
//     const inputLocal = document.getElementById('local');
//     const dropdown = document.getElementById('dropdown-localizacao');
    
//     // Se o campo de input não estiver vazio, o dropdown some
//     if (inputLocal.value.trim() !== "") {
//         dropdown.style.display = 'none';
//     }
//     else{
//         // Caso contrário, ele permanece visível
//         dropdown.style.display = 'block';
//     }
// }

// // Esconde a lista suspensa quando o usuário clica fora dela
// document.addEventListener('click', function(event) {
//     const dropdown = document.getElementById('dropdown-localizacao');
//     const inputLocal = document.getElementById('local');

//     if (!inputLocal.contains(event.target) && !dropdown.contains(event.target)) {
//         dropdown.style.display = 'none';
//     }
// });


// // Verifica o estado do input sempre que o usuário digitar algo
// document.getElementById('local').addEventListener('input', function() {
//     verificarInput();
// });

// // Exibe o dropdown ao clicar no input, mas só se o input estiver vazio
// document.getElementById('local').addEventListener('click', function() {
//     mostrarOpcoesLocalizacao();
// });



// // Função para quando uma localidade é selecionada
// function selecionarLocalidade(localidade) {
//     const inputLocal = document.getElementById('local');
//     inputLocal.value = localidade;
//     salvarLocalidade(localidade);
// }

// document.getElementById('local').addEventListener('click', function() {
//     mostrarOpcoesLocalizacao();
// });


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