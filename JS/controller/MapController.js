// MapController.js

const MapController = ((model, view) => {

    // Função que busca os hospitais baseados no procedimento selecionado
    const buscarHospitais = () => {
        const selectedProcedures = Array.from(document.querySelectorAll("input[name='procedimento']:checked"))
            .map(checkbox => checkbox.id);

        // Armazena os checkboxes selecionados no localStorage
        localStorage.setItem("selectedProcedures", JSON.stringify(selectedProcedures));

        model.carregarHospitais().then(() => {
            const hospitals = selectedProcedures.flatMap(procedureId => model.getHospitalsByProcedure(procedureId));
            localStorage.removeItem("hospitaisFiltrados");
            localStorage.setItem("hospitaisFiltrados", JSON.stringify(hospitals));
            NavView.displayHospitalsNav(hospitals);
            view.addHospitalMarkers(hospitals);
            removeRoute();
        });

        document.getElementById('checkboxes').style.display = "none";

    };

    const renderizaResultados = () => {
        const selectedProcedures = Array.from(document.querySelectorAll("input[name='procedimento']:checked"))
            .map(checkbox => checkbox.id);

        // Armazena os checkboxes selecionados no localStorage
    localStorage.setItem("selectedProcedures", JSON.stringify(selectedProcedures));

        model.carregarHospitais().then(() => {
            const hospitals = selectedProcedures.flatMap(procedureId => model.getHospitalsByProcedure(procedureId));
            localStorage.removeItem("hospitaisFiltrados");
            localStorage.setItem("hospitaisFiltrados", JSON.stringify(hospitals));
            NavView.displayHospitalsNav(hospitals);
            // view.addHospitalMarkers(hospitals);
        });

    };

    // Função para inicializar o mapa e configurar geolocalização e busca
    const init = () => {
        setupUserGeolocation();  // Chama a função para configurar o botão de geolocalização

        document.getElementById('checkboxes').style.display = "none";

        const initialPosition = { lat: -22.969272265536834, lng: -43.21789775773896 }; // Tecgraf
        // -22.969272265536834, -43.21789775773896
        const mapElementId = "map";

        view.initMap(initialPosition, mapElementId);

        initAutocomplete();

        // Restaurar checkboxes selecionados
        const storedProcedures = localStorage.getItem("selectedProcedures");
        if (storedProcedures) {
            const selectedProcedures = JSON.parse(storedProcedures);
            selectedProcedures.forEach(id => {
                const checkbox = document.getElementById(id);
                if (checkbox) {
                    checkbox.checked = true;
                }
            });
        }

         // Verifica se há hospitais salvos no localStorage
        const hospitaisSalvos = localStorage.getItem("hospitaisFiltrados");
        if (hospitaisSalvos) {
            const hospitals = JSON.parse(hospitaisSalvos);
            view.addHospitalMarkers(hospitals);
        }

        const localSalvo = localStorage.getItem("localFiltrado");
        if (localSalvo) {
            const local = JSON.parse(localSalvo);
            view.meuLocalDePartida(local);
            view.centerMap(local.geometry.location);

        }

        const localSalvoGeo = localStorage.getItem("localFiltradoGeo");
        if (localSalvoGeo) {
            const localGeo = JSON.parse(localSalvoGeo);
            view.meuLocalDePartidaLocAtual(localGeo);
            view.centerMap(localGeo);
        }
 
        // document.getElementById("btnBusca").addEventListener("click", buscaPorTexto);
        
    };


    // Função para converter lat/lng em endereço de texto e exibir no mapa
    const geocodeLatLng = (latlng) => {
        const geocoder = new google.maps.Geocoder();

        geocoder.geocode({ location: latlng }).then((response) => {
            if (response.results[0]) {
                // Define o endereço no campo de busca
                document.getElementById("local").value = response.results[0].formatted_address;
                
                localGeoloc = response.results[0].formatted_address;
              
                // Centraliza o mapa e adiciona o marcador
                view.centerMap(latlng);
                view.meuLocalDePartidaLocAtual(latlng);

            } else {
                alert("Nenhum resultado encontrado");
            }
        }).catch((error) => alert("Erro na geolocalização: " + error));
    };

    // Função para obter a geolocalização do usuário e centralizar o mapa
    const getUserLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const userPosition = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    // view.centerMap(userPosition);
                    geocodeLatLng(userPosition);  // Converte para texto e adiciona marcador
                    view.meuLocalDePartidaLocAtual(userPosition);
                    if(localStorage.getItem("localFiltrado")){
                        localStorage.removeItem("localFiltrado");
                    }

                    if (localStorage.getItem("localFiltradoGeo")) {
                        localStorage.removeItem("localFiltradoGeo");
                    }


                    localStorage.setItem("localFiltradoGeo", JSON.stringify(userPosition));
                    
                },
                () => {
                    alert("Erro ao obter localização. Verifique as permissões do navegador.");
                }
            );
        } else if (!navigator.geolocation) {
            alert("Geolocalização não é suportada neste navegador.");
        }
    };

    // Função para buscar locais por texto
    const buscaPorTexto = () => {
        const locationInput = document.getElementById("local").value;
        const service = view.getPlacesService();  // Obtém a instância do PlacesService da View
        const request = {
            query: locationInput,
            fields: ["name", "geometry"],
        };
        
        service.findPlaceFromQuery(request, (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && results) {
                const place = results[0];
                view.centerMap(place.geometry.location);

                view.meuLocalDePartida(place);

                if(localStorage.getItem("localFiltrado")){
                    localStorage.removeItem("localFiltrado");
                }

                if (localStorage.getItem("localFiltradoGeo")) {
                    localStorage.removeItem("localFiltradoGeo");
                }
                localStorage.setItem("localFiltrado", JSON.stringify(place));


            } else {
                alert("Local não encontrado. Tente uma nova pesquisa.");
            }
        });
    };

    const setupUserGeolocation = () => {
        const btnUseUserLocation = document.getElementById("use-user-geolocation")
        
        btnUseUserLocation.addEventListener("click", () => {
            getUserLocation();
            NavView.alterarDropdown(false)
        })
    }

    const initAutocomplete = () => {
        const locationInput = document.getElementById("local");
    
        // Configura o Autocomplete no input 'local'
        const autocomplete = new google.maps.places.Autocomplete(locationInput, {
            types: ['geocode'], // Limita a busca a endereços e locais
            fields: ["name", "geometry"], // Campos que queremos obter
            componentRestrictions: { 
                country: 'BR',  // Limita a busca ao Brasil
            },
            // Restrição adicional para o estado RJ
            bounds: new google.maps.LatLngBounds(
                new google.maps.LatLng(-23.0, -43.5), // Limite inferior da lat/long do Rio de Janeiro
                new google.maps.LatLng(-22.0, -43.0) // Limite superior da lat/long do Rio de Janeiro
            )
        
        });
    
        // Adiciona um evento de listener para a seleção de um local
        autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();
            if (place.geometry) {
                // Se um local válido for selecionado
                view.centerMap(place.geometry.location);
                view.meuLocalDePartida(place);
    
                if(localStorage.getItem("localFiltrado")) {
                    localStorage.removeItem("localFiltrado");
                }
    
                if (localStorage.getItem("localFiltradoGeo")) {
                    localStorage.removeItem("localFiltradoGeo");
                }
    
                localStorage.setItem("localFiltrado", JSON.stringify(place));
            } else {
                alert("Por favor, selecione um local válido da lista de sugestões.");
            }
        });

        // Criando um evento para adicionar a sugestão manualmente
        locationInput.addEventListener('focus', () => {
            const inputValue = locationInput.value;

            if (!inputValue) {

                // Exibe a sugestão quando o campo está vazio
                locationInput.value = defaultSuggestion;
            }
        });

        // document.getElementById('limparLocal').addEventListener('click', limpaLoc);


    };

    const limpaLoc = () => {
        const campoLocal = document.getElementById('local');
        console.log("antes de limpar: ",campoLocal.value)
        campoLocal.value = '';
        console.log("depois de limpar: ",campoLocal.value)

        // Garantir que o input está focado
        campoLocal.focus();
        // Disparar o evento de clique programaticamente
        campoLocal.dispatchEvent(new Event('click'));

        // Mostrar o dropdown explicitamente
        NavView.alterarDropdown(true);

    }

    const iniciarRotaParaHospital = async (hospitalPosition, travelMode = 'WALKING') => {
        let origem = null;
    
        // Tenta recuperar a geolocalização do local de partida armazenada
        const localPartidaGeo = JSON.parse(localStorage.getItem("localFiltradoGeo"));
        if (localPartidaGeo) {
            origem = { lat: localPartidaGeo.lat, lng: localPartidaGeo.lng };      
        } 
        else {
            // Tenta recuperar a posição do local selecionado no input
            const localPartida = JSON.parse(localStorage.getItem("localFiltrado"));
            if (localPartida && localPartida.geometry) {
                origem = {
                    lat: localPartida.geometry.location.lat,
                    lng: localPartida.geometry.location.lng,
                };
                await calcularERenderizarRota(origem, hospitalPosition, travelMode);
            }
        }
    
        if (origem) {
            view.calcularERenderizarRota(origem, hospitalPosition, travelMode);   
        } 
        else {
            alert("Localização de partida não definida.");
        }
    };

    const addClickEventToHospitalMarker = (hospitalMarker, hospitalPosition) => {
        hospitalMarker.addListener("click", () => {
            iniciarRotaParaHospital(hospitalPosition);
        });
    };

    

    return {
        buscarHospitais,
        buscaPorTexto,
        getUserLocation,
        setupUserGeolocation,
        limpaLoc,
        init,
        addClickEventToHospitalMarker,
        iniciarRotaParaHospital,

        renderizaResultados
    };
})(MapModel, MapView);
