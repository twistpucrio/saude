const NavView = (() => {
    
    // Mensagem de erros
    const displayError = (message) => {
        document.getElementById('details').innerHTML = `<p>${message}</p>`;
    };

    //Display lista de hospitais
    const displayHospitalsNav = (hospitals) => {
        const displayHospitaisEncontrados = document.getElementById('displayHospitaisEncontrados');
        displayHospitaisEncontrados.innerHTML = `
            <div class="drag-handle"></div> <!-- Apenas uma barra para arrastar -->
        `; // Limpa conteúdo antigo e adiciona a barra de arrasto

        
        hospitals.forEach(hospital => {
            displayHospitaisEncontrados.innerHTML += `

                <a href="detalhesHospital.html?id=${hospital.id}">
                    <div id="hospital-${hospital.nome}" tabindex="0" onclick="addClickEventToDiv(hospital-${hospital.nome}, ${hospital.id});');">    
                    <h2>${hospital.nome}</h2>
                        <p><strong>Endereço:</strong> ${hospital.endereco}</p>
                    </div>
                </a>

                <div>
                    <button class="directon_nav">
                        <img src="img/icons/directions_white.svg" alt="">
                        <p>Como chegar</p>
                    </button>
                </div>
            `;
        });

        // Adiciona a classe 'open' para mostrar o painel
        displayHospitaisEncontrados.classList.add('open');
    };

    // Mostra ou esconde
    const alterarDropdown = (visible) => {
        const dropdown = document.getElementById('dropdown-localizacao');
        dropdown.style.display = visible ? 'block' : 'none';
    };

    // Atualiza valor do input
    const setInputValue = (value) => {
        document.getElementById('local').value = value;
    };


    //mobile - arrastar resultados
    // Adiciona funcionalidade de arrasto
    const arrastaResults = () => {
        const displayHospitais = document.getElementById('displayHospitaisEncontrados');
        const dragHandle = displayHospitais.querySelector('.drag-handle');
    
        let isDragging = false;
        let startY, startTop;
    
        // Função para calcular a altura máxima e mínima do painel
        const getMaxHeight = () => window.innerHeight * 1;  // 80% da altura da janela
        const getMinHeight = () => 100;  // Mínimo de 100px

       
        const onMouseMove = (e) => {
            if (!isDragging) return;
    
            // captura a posição do mousse/touch
            const clientY = e.clientY || e.touches[0].clientY;
            const deltaY = clientY - startY ; 
            
            // Calcula a nova altura
            const newHeight = Math.min(getMaxHeight(), Math.max(getMinHeight(), startHeight + deltaY));const newTop = Math.max(startTop - deltaY, window.innerHeight * 0.632); // Limita para não ultrapassar top: 63.2%
    
            displayHospitais.style.height = `${newHeight}px`; 
        };
    
        const stopDragging = () => {
            if (isDragging) {
                isDragging = false;
                dragHandle.style.cursor = 'grab';
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('touchmove', onMouseMove);
                document.removeEventListener('mouseup', stopDragging);
                document.removeEventListener('touchend', stopDragging);
            }
        };
    
        // Inicia o arraste ao clicar no botão
        dragHandle.addEventListener('mousedown', (e) => {
            isDragging = true;
            startY = e.clientY;
            startHeight = displayHospitais.offsetHeight;
            dragHandle.style.cursor = 'grabbing';
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', stopDragging);
            e.preventDefault();
        });
    
        dragHandle.addEventListener('touchstart', (e) => {
            isDragging = true;
            startY = e.touches[0].clientY;
            startHeight = displayHospitais.offsetHeight;
            
            dragHandle.style.cursor = 'grabbing';
            document.addEventListener('touchmove', onMouseMove);
            document.addEventListener('touchend', stopDragging);
            e.preventDefault();
        });
    };

    

    return {
        displayError,
        displayHospitalsNav,
        alterarDropdown,
        setInputValue,
        arrastaResults
    };
})();