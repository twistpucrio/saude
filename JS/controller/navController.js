const NavController = (() => {

    let expanded = false;

    // esconde o dropdown quando clicado 'fora'
    const handleClickOutside = (event) => {
        const dropdown = document.getElementById('dropdown-localizacao');
        const inputLocal = document.querySelector('.input_pesquisa');
        
        if (!inputLocal.contains(event.target) && !dropdown.contains(event.target)) {
            NavView.alterarDropdown(false);
        }
    };


    const handleLocationSelection = (location) => {
        NavView.setInputValue(location);
        NavModel.saveLocation(location);
        loadLocation(); // Atualiza o campo com a última localização
        NavView.alterarDropdown(false);
    };

    // Verificar o valor do input e gerenciar a visibilidade do dropdown
    const handleInputChange = () => {
        const inputLocal = document.getElementById('local');
        const location = inputLocal.value.trim();
        const btnLimpar = document.getElementById('limparLocal');
        const imgPesquisa = document.getElementById('imgPesquisa');

        if (location !== "") {
            NavView.alterarDropdown(false);

            // Substituir a lupa pelo botão de limpar
            imgPesquisa.style.display = 'none'
            btnLimpar.style.display = 'flex';
            btnLimpar.style.position ='absolute'
            btnLimpar.style.right = '3%'


            saveLocation(location); // Salva no LocalStorage ao digitar

        } else {
            NavView.alterarDropdown(true);

            // Mostrar a lupa novamente
            btnLimpar.style.display = 'none'; 
            imgPesquisa.style.display = 'flex';
            imgPesquisa.style.position ='absolute'
            imgPesquisa.style.right = '4%'
            imgPesquisa.style.top = '5%' 
        }
    };

    // Handle geolocation button click
    const handleGeolocation = () => {
        const geolocationButton = document.getElementById('use-user-geolocation');
        
        geolocationButton.addEventListener('click', () => {

            MapController.setupUserGeolocation();            
            
        })

    };

    // Mostrar ou esconder os checkboxes
    const showCheckboxes = () => {
        const checkboxes = document.getElementById('checkboxes');
        if (!expanded) {
            checkboxes.style.display = "block";
            expanded = true;
        } else {
            checkboxes.style.display = "none";
            expanded = false;
        }
    };

    const handleInputFocus = () => {
        const inputLocal = document.getElementById('local');
        if (inputLocal.value.trim() === "") {
            NavView.alterarDropdown(true);
            console.log("medsss")
        }
       
    };

    // Initialize event listeners
    const init = () => {
        document.getElementById('local').addEventListener('input', handleInputChange);
        document.getElementById('local').addEventListener('click', handleInputFocus);
        
        document.getElementById('limparLocal').addEventListener('click', () => {
            MapController.limpaLoc()
        });
        
        document.addEventListener('click', handleClickOutside);

    };

    return {
        init,
        handleLocationSelection,
        handleGeolocation,
        showCheckboxes,
        handleInputFocus
    };
})();

