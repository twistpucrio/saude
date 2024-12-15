
// MapView.js

const MapView = (() => {
    let map;
    const hospitalMarkers = [];
    let localPartida;

    let directionsService;
    let directionsRenderer;
    let currentInfoWindow = null;
    
    let routeRenderers = []; // Armazena os renderizadores de rotas alternativas
    let currentRouteIndex = -1;
    let currentRouteRenderer = null; // Armazena o renderer ativo

    // Inicializa o mapa e salva a instância
    const initMap = (position, mapElementId) => {

        map = new google.maps.Map(document.getElementById(mapElementId), {
            center: position,
            zoom: 15,
        // MODO CLARO:
        //     styles:[
        //       {
        //           "featureType": "landscape.man_made",
        //           "elementType": "geometry", 
        //           "stylers": [
        //               {
        //                   "color": "#e3e3e3"
        //               }
        //           ]
        //       },
        //       {
        //           "featureType": "landscape.natural",
        //           "elementType": "geometry",
        //           "stylers": [
        //               {
        //                   "color": "#c0e2b3"
        //               }
        //           ]
        //       },
        //       {
        //           "featureType": "landscape.natural.terrain",
        //           "elementType": "geometry",
        //           "stylers": [
        //               {
        //                   "visibility": "on"
        //               }
        //           ]
        //       },
        //       {
        //           "featureType": "poi",
        //           "elementType": "labels",
        //           "stylers": [
        //               {
        //                   "visibility": "on"
        //               }
        //           ]
        //       },
        //       {
        //           "featureType": "poi.business",
        //           "elementType": "all",
        //           "stylers": [
        //               {
        //                   "visibility": "off"
        //               }
        //           ]
        //       },
        //       {
        //           "featureType": "poi.medical",
        //           "elementType": "all",
        //           "stylers": [
        //               {
        //                   "visibility": "off"
        //               }
        //           ]
        //       },
        //       {
        //           "featureType": "poi.park",
        //           "elementType": "geometry",
        //           "stylers": [
        //               {
        //                   "color":"#a8d5a8"
        //               }
        //           ]
        //       },
        //       {
        //           "featureType": "road",
        //           "elementType": "geometry.stroke",
        //           "stylers": [
        //               {
        //                   "visibility": "on"
        //               }
        //           ]
        //       },
        //       {
        //           "featureType": "road",
        //           "elementType": "labels",
        //           "stylers": [
        //               {
        //                   "visibility": "on"
        //               }
        //           ]
        //       },
        //       {
        //           "featureType": "road.highway",
        //           "elementType": "geometry.fill",
        //           "stylers": [
        //               {
        //                   "color": "#ffd400"
        //               }
        //           ]
        //       },
        //       {
        //           "featureType": "road.highway",
        //           "elementType": "geometry.stroke",
        //           "stylers": [
        //               {
        //                   "color": "#ccac00"
        //               }
        //           ]
        //       },
        //       {
        //           "featureType": "road.arterial",
        //           "elementType": "geometry.fill",
        //           "stylers": [
        //               {
        //                   "color": "#f7f7f7"
        //               }
        //           ]
        //       },
        //       {
        //           "featureType": "road.local",
        //           "elementType": "geometry.fill",
        //           "stylers": [
        //               {
        //                   "color": "#c0c1c3"
        //               }
        //           ]
        //       },
        //       {
        //           "featureType": "transit.station.airport",
        //           "elementType": "geometry.fill",
        //           "stylers": [
        //               {
        //                   "color": "#cfb2db"
        //               }
        //           ]
        //       },
        //       {
        //         "featureType": "water",
        //         "elementType": "labels.text.fill", 
        //         "stylers": [
        //             {
        //                 "color": "#000000" // Define a cor do texto como branco
        //             }
        //         ]
        //     },
        //     {
        //         "featureType": "water",
        //         "elementType": "labels.text.stroke", 
        //         "stylers": [
        //             {
        //                 "color": "#ffffff", // Define o contorno como preto
        //                 "weight": 2 // Espessura do contorno
        //             }
        //         ]
        //     },
        //     {
        //         "featureType": "water",
        //         "elementType": "geometry",
        //         "stylers": [
        //             {
        //                 "color": "#86beda" // Cor da água
        //             }
        //         ]
        //     },
        //   ],

        //MODO NOTURNO
        styles: [
        { elementType: "geometry", stylers: [{ color: "#181f28" }] },
        { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
        { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },

        {
            featureType: "administrative",
            elementType: "labels.text",
            stylers: [

                 {
                    "color": "#fffffff"
                },
                {
                    "weight": "0.01"
                }
            ]
        },
        {
            featureType: "landscape.man_made",
            elementType: "geometry", 
            stylers: [
                {
                    color: "#02060a"
                }
            ]
        },

        {
            featureType: "landscape.natural",
            elementType: "geometry",
            stylers: [
                {
                    color: "#233831"
                }
            ]
        },

        {
            featureType: "landscape.natural.terrain",
            elementType: "geometry",
            stylers: [
                {
                    visibility: "on"
                }
            ]
        },
        {
            featureType: "poi",
            elementType: "all",
            stylers: [
                { visibility: "off" }
            ]
        },
        {
            featureType: "road",
            elementType: "geometry",
            stylers: 
            [
                { color: "#38414e" },
                {lightness: "5"}
            
            ],
        },
        {
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: [{ color: "#9b9a96" }],
        },
        {
            featureType: "road",
            elementType: "labels.text.fill",
            stylers: [{ color: "#f9cd2c" },{lightness: "5"}],
        },
        {
            featureType: "road.highway",
            elementType: "geometry",
            stylers: [{ color: "#746855" }],
        },
        {
            featureType: "road",
            elementType: "labels.icon",
            stylers: [
                { visibility: "off" } 
            ]
        },
        {
            featureType: "road.highway",
            elementType: "labels.icon",
            stylers: [
                { visibility: "off" } 
            ]
        },
        {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [{ color: "#1f2835" }],
        },

        { 
            featureType: "transit",
            elementType: "all",
            stylers: [{ visibility: "on"}],
        },

        {
            featureType: "transit.station",
            elementType: "labels.text.fill",
            stylers: [{ color: "#9bdaff" }],
        },
        {
            featureType: "transit.line",
            elementType: "geometry",
            stylers: [{ visibility: "off" }] // Oculta as linhas de trem e metrô
        },
        {
            featureType: "water",
            elementType: "geometry",
            stylers: [{ color: "#055164" }],
        },
        {
            featureType: "water",
            elementType: "labels.text.fill",
            stylers: [{ color: "#bad5fc" }],
        },

        ],
        });

        // Inicializa o serviço de locais após o mapa estar pronto
        service = new google.maps.places.PlacesService(map);

        directionsService = new google.maps.DirectionsService();
        directionsRenderer = new google.maps.DirectionsRenderer({
            map: map,
            suppressMarkers: true, // Para evitar que adicione seus próprios marcadores
        })
    };


    const getMapInstance = () => {
        return map; // Retorna a instância do mapa
    };

    const getPlacesService = () => {
        return service; // Expor a instância de PlacesService para o Controller
    };

    //mudar aqui
    const addClickEventToMarker = (maker, hospitalId, hospitalName, hospitalPosition) => {
        const infoWindow = new google.maps.InfoWindow({
            content: `
            <div class="infowindow">
                <h4>${hospitalName}</h4> 
                <p>Mais informações sobre o hospital.</p>
                <button class="btn_infoWindow" id="detailsButton">Mais Detalhes</button>
                <button class="btn_infoWindow" id="routeButton">Traçar Rota</button>
            </div>`,
            ariaLabel: "",
        });
    
        maker.addListener('click', () => {

            if (currentInfoWindow) {
                currentInfoWindow.close();
            }
            infoWindow.open(maker.getMap(), maker);
            
            currentInfoWindow = infoWindow;
    
            google.maps.event.addListenerOnce(infoWindow, 'domready', () => {
                // botão "Mais detalhes"
                document.getElementById('detailsButton').addEventListener('click', () => {
                    window.location.href = `detalhesHospital.html?id=${hospitalId}`;
                });
    
                // botão "Traçar Rota"
                document.getElementById('routeButton').addEventListener('click', () => {
                    showRouteOptions(infoWindow, hospitalPosition, hospitalId, hospitalName);
                });
    
                // Evento de fechamento do InfoWindow (clicar no "X")
                google.maps.event.addListener(infoWindow, 'closeclick', () => {
                    removeRoute(); // Remove a rota quando o InfoWindow for fechado
                    document.getElementById('route-options').style.display = 'none';
                    MapController.renderizaResultados();
                });
    
                // Tornar o InfoWindow arrastável
                makeInfoWindowDraggable(infoWindow, maker.getMap());

                google.maps.event.addListener(infoWindow, 'domready', attachDragEvents); // Reanexa após cada atualização

            });
        });
    };
  
      const handleHospitalNavClick = (hospitalId) => {
        // Encontre o marcador associado ao ID do hospital
        const marker = hospitalMarkers.find(m => m.hospitalId === hospitalId);
    
        if (marker) {
            // Simula o clique no marcador, abrindo o InfoWindow
            google.maps.event.trigger(marker, 'click');
        } else {
            console.error(`Marcador para o hospital com ID ${hospitalId} não encontrado.`);
        }
    };
  
      const displayHospitalsOnMap = (hospitals) => {
        // Aqui, você passa a função handleHospitalNavClick para o NavView
        NavView.displayHospitalsNav(hospitals, handleHospitalNavClick);
    };
  
  
    const hospitals = [];
    // Muda a rota de acordo com o modo escolhido
    const showRouteOptions = (infoWindow, hospitalPosition, hospitalId, hospitalName) => {
        
        // Salvar o conteúdo original do InfoWindow
        const originalContent = infoWindow.getContent();
        
        // Substitui o conteúdo do InfoWindow para exibir os modos de transporte
        infoWindow.setContent(`
            <div class="infowindow">
                <h4>Escolha o modo de transporte</h4>
                <button class="modoRota" id="drivingRoute">
                    <img src="img/icons/car.svg" alt="" title="Dirigindo">
                </button>
                <button class="modoRota" id="walkingRoute">
                    <img src="img/icons/walk.svg" alt="" title="Caminhando">
                </button>
                <button class="modoRota" id="transitRoute">
                    <img src="img/icons/bus.svg" alt="" title="Transporte Público">
                </button>
                <button id="voltar">Voltar</button>
            </div>`
        );
    
        google.maps.event.addListenerOnce(infoWindow, 'domready', () => {
            // Definir os eventos para cada opção de rota
            document.getElementById('drivingRoute').addEventListener('click', () => {
                updateRoute(hospitalPosition, 'DRIVING');
                NavView.displayHospitalsNav(false);
            });
            document.getElementById('walkingRoute').addEventListener('click', () => {
                updateRoute(hospitalPosition, 'WALKING');
                NavView.displayHospitalsNav(false);
            });
            document.getElementById('transitRoute').addEventListener('click', () => {
                updateRoute(hospitalPosition, 'TRANSIT');
                NavView.displayHospitalsNav(false);
            });
    
            document.getElementById('voltar').addEventListener('click', () => {
                

                // Ao clicar em "Voltar", restaura o conteúdo original
                infoWindow.setContent(originalContent);
                google.maps.event.addListenerOnce(infoWindow, 'domready', () => {
                    // Reanexa os eventos do InfoWindow original
                    document.getElementById('detailsButton').addEventListener('click', () => {
                        window.location.href = `detalhesHospital.html?id=${hospitalId}`;
                    });
                    document.getElementById('routeButton').addEventListener('click', () => {
                        showRouteOptions(infoWindow, hospitalPosition, hospitalId, hospitalName);
                    });

                    // opções rota
                    document.getElementById('route-options').style.display = 'none';
                    removeRoute();

                });
                MapController.renderizaResultados();
                
            });
        });
    };

    // Rota
    async function calcularERenderizarRota(destino, modo) {
        const { DirectionsService, DirectionsRenderer } = await google.maps.importLibrary("routes");
    
        const directionsService = new DirectionsService();
    
        const request = {
            origin: localPartida.getPosition(),
            destination: destino,
            travelMode: modo,
            provideRouteAlternatives: true, // Solicita múltiplas opções de rota
        };
    
        directionsService.route(request, (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
                // Remove todas as rotas anteriores antes de renderizar novas rotas
                removeAllRouteRenderers();
                clearRouteOptions();
    
                // Renderiza todas as rotas alternativas
                result.routes.forEach((route, index) => {
                    const renderer = new DirectionsRenderer({
                        map: map,
                        directions: result,
                        routeIndex: index,
                        polylineOptions: {
                            strokeColor: index === 0 ? "#FF5733" : "#337AFF", // Inicializa a rota destacada
                            strokeOpacity: index === 0 ? 1 : 0.2, 
                            strokeWeight: index === 0 ? 6 : 4,
                        },
                        suppressMarkers: false, // Para mostrar os marcadores de rota
                    });

                    console.log("Antes de adicionar renderer, estado de routeRenderers:", routeRenderers);
                    routeRenderers.push(renderer); // Armazena cada renderer em um array global
                    console.log("Após adicionar renderer, estado de routeRenderers:", routeRenderers);

                    // Adiciona a rota à lista de opções
                    addRouteOption(route, index, modo);
                });
    
                // Destaca a primeira rota por padrão
                highlightRoute(0);
            } else {
                alert("Erro ao calcular a rota: " + status);
            }
        });
    }

    // Função para atualizar a rota com o novo modo de transporte
    const updateRoute = (destination, travelMode) => {
        // Invoca a função de cálculo de rota para atualizar o modo de transporte
        calcularERenderizarRota(destination, travelMode);
    };


    const removeAllRouteRenderers = () => {
        routeRenderers.forEach(renderer => renderer.setMap(null));
        routeRenderers = [];
    };

    const removeRoute = () => {
        removeAllRouteRenderers();
        currentRouteRenderer = null;
    };

    const addRouteOption = (route, index, modo) => {
        const routeOptionsContainer = document.getElementById("route-options");
        document.getElementById("route-options").style.display = 'block';
    
        const routeOption = document.createElement("div");
        routeOption.className = "route-option";
        routeOption.dataset.index = index;
    
        // Informações básicas da rota
        let details = ``;

        if (modo === google.maps.TravelMode.TRANSIT) {
            const steps = route.legs[0].steps;
            
            details = `
                <div class="route-option-details">
                    <div class="img_dur">    
                        <img src="img/icons/bus.svg" alt="Transporte" class="step-icon">
                        ${route.legs[0].duration.text} 
                    </div>
                
                    <div class="route-lines"> 
                        
            `;

            let lines = [];  // Lista para armazenar as linhas de transporte
            
            // Adiciona as linhas de transporte (ônibus) à lista de 'lines'
            steps.forEach(step => {
                if (step.transit) {
                    lines.push(step.transit.line.short_name || step.transit.line.name);
                }
            });
            
            // Adiciona as linhas à variável details
            lines.forEach((line, index) => {
                details += `
                    
                        <span class="line">${line}</span>
                `;

                // Se não for a última linha, adiciona "→"
                if (index < lines.length - 1) {
                    details += " → ";
                }
            });
        

            details += `
                </div>
                <div class="p">
                    <p>Distância: ${route.legs[0].distance.text}</p>
                </div>
            `; // Fecha a div das linhas de transporte
        
        
            // Adiciona o botão de detalhes e o container vazio para mostrar mais informações
            details += `
                    <button class="toggle-details-btn" style="display: none;">Ver Detalhes</button>
                    <div class="route-details" style="display: none;"></div> <!-- Container para detalhes -->
                </div>
            `;
        }

        if (modo === google.maps.TravelMode.DRIVING) {
            details = `
                <div class="route-option-details">
                    <div class="img_dur">
                        <img src="img/icons/car.svg" alt="Dirigindo" class="step-icon">
                        ${route.legs[0].duration.text}
                    </div>
                    <div class="p">
                        <p>Distância: ${route.legs[0].distance.text}</p>
                    </div>
                    <button class="toggle-details-btn" style="display: none;">Ver Detalhes</button>
                    <div class="route-details" style="display: none;"></div> <!-- Container para detalhes -->
                </div>
            `;
        }
        

        if (modo === google.maps.TravelMode.WALKING) {
            details = `
            <div class="route-option-details">
                <div class="img_dur">
                    <img src="img/icons/walk.svg" alt="Caminhando" class="step-icon">
                    ${route.legs[0].duration.text}
                </div>
                <div class="p">
                    <p>Distância: ${route.legs[0].distance.text}</p>
                </div>
                <button class="toggle-details-btn" style="display: none;">Ver Detalhes</button>
                <div class="route-details" style="display: none;"></div> <!-- Container para detalhes -->
            </div>
        `;
        }
    
        routeOption.innerHTML = details;
    
        // Adiciona evento para alternar exibição de detalhes
        const toggleDetailsButton = routeOption.querySelector('.toggle-details-btn');
        const routeDetailsContainer = routeOption.querySelector('.route-details');
    
        toggleDetailsButton.addEventListener('click', () => {
            if (routeDetailsContainer.style.display === 'none') {
                routeDetailsContainer.innerHTML = getRouteDetails(route, modo); // Gera os detalhes
                routeDetailsContainer.style.display = 'block';
                toggleDetailsButton.textContent = 'Esconder Detalhes';
            } else {
                routeDetailsContainer.style.display = 'none';
                toggleDetailsButton.textContent = 'Detalhes';
            }
        });
    
        routeOption.addEventListener("click", () => {
            // Remove a classe 'active' de todas as opções
            const allOptions = document.querySelectorAll(".route-option");
            allOptions.forEach((option) => option.classList.remove("active"));
    
            // Adiciona a classe 'active' à opção clicada
            routeOption.classList.add("active");
    
            console.log(`Opção de rota clicada: ${index}`);
            highlightRoute(); // Destaca a rota ativa
        });
    
        routeOptionsContainer.appendChild(routeOption);
    };
    
    // Função para gerar os detalhes da rota
    const getRouteDetails = (route, modo) => {
        let details = "";
    
        const steps = route.legs[0].steps;
    
        steps.forEach((step) => {
            if (step.travel_mode === "WALKING") {
                details += `
                    <div class="step-details">
                        <img src="img/icons/walk.svg" alt="Caminhando" class="step-icon">
                        Ande por ${step.distance.text} (${step.duration.text})
                    </div>
                `;
            } else if (step.travel_mode === "DRIVING") {
                details += `
                    <div class="step-details">
                        <img src="img/icons/car.svg" alt="Dirigindo" class="step-icon">
                        Dirija por ${step.distance.text} (${step.duration.text})
                    </div>
                `;
            } else if (step.travel_mode === "TRANSIT" && step.transit) {
                details += `
                    <div class="step-details">
                        <img src="img/icons/bus.svg" alt="Ônibus" class="step-icon">
                        <strong>Linha:</strong> ${step.transit.line.short_name || step.transit.line.name} <br>
                        <strong>De:</strong> ${step.transit.departure_stop.name} <br>
                        <strong>Para:</strong> ${step.transit.arrival_stop.name} <br>
                        <strong>Duração:</strong> ${step.duration.text}
                    </div>
                `;
            }
        });
    
        return details;
    };
    

    const highlightRoute = () => {
        

        // 1. Verificar qual opção possui a classe 'active' e pegar o índice dela
        const routeOptions = document.querySelectorAll(".route-option");
        let activeIndex = 0;
        
        routeOptions.forEach((option) => {
            if (option.classList.contains("active")) {
                activeIndex = parseInt(option.dataset.index); // Pega o índice do data-index
            }
        });
    
        console.log("Rota ativa (index): ", activeIndex);
        console.log("routeRenderers: ", routeRenderers);

        // 2. Atualiza o estilo das rotas no mapa com base no índice ativo
        routeRenderers.forEach((renderer, i) => {
            console.log("i - ", i, "activeIndex - ", activeIndex)
            if (i === activeIndex) {
                renderer.setMap(null);
                renderer.setOptions({
                    polylineOptions: {
                        strokeColor: "#FF5733",  // Cor da rota ativa
                        strokeOpacity: 1,
                        strokeWeight: 6,
                    },
                });
                renderer.setMap(map); // Reanexa o renderizador ao mapa
            } 
            else {
                renderer.setMap(null);
                renderer.setOptions({
                    polylineOptions: {
                        strokeColor: "#ccc", // Cor das rotas não ativas
                        strokeOpacity: 0.2,
                        strokeWeight: 4,
                    },
                });
                renderer.setMap(map); // Reanexa o renderizador ao mapa
            }
        });

        // 4. Atualiza a classe 'active' na lista de opções
        routeOptions.forEach((option, index) => {
            if (index === activeIndex) {
                option.classList.add("active"); // Adiciona 'active' ao índice correspondente
            } else {
                option.classList.remove("active"); // Remove 'active' dos outros
            }
        });
        console.log("routeRenderers: ", routeRenderers);
        // 3. Atualiza o índice atual global
        // currentRouteIndex = activeIndex;
    };

    const clearRouteOptions = () => {
        const routeOptionsContainer = document.getElementById("route-options");
        routeOptionsContainer.innerHTML = ""; // Limpa a lista de opções anteriores
    };


    
    // Função para tornar o InfoWindow arrastável    
    const makeInfoWindowDraggable = (infoWindow, map) => {
        let isDragging = false;
        let startLatLng = null;
        let startX = 0;
        let startY = 0;
    
        const attachDragEvents = () => {
            const container = document.querySelector('.infowindow'); // Seleciona a div do conteúdo do InfoWindow

            if (!container) return;

            container.addEventListener('mousedown', (e) => {
                e.preventDefault();
                isDragging = true;
                map.set('draggable', false);
                startLatLng = infoWindow.getPosition();
                startX = e.clientX;
                startY = e.clientY;
                container.style.cursor = 'move';
            });
        
            document.addEventListener('mousemove', (e) => {
                if (!isDragging) return;
        
                const dx = e.clientX - startX;
                const dy = e.clientY - startY;
        
                const projection = map.getProjection();
                const point = projection.fromLatLngToPoint(startLatLng);
        
                const scale = Math.pow(2, map.getZoom());
        
                const newPoint = new google.maps.Point(
                    point.x + dx / scale,
                    point.y + dy / scale
                );
        
                const newLatLng = projection.fromPointToLatLng(newPoint);
                infoWindow.setPosition(newLatLng);
            });
        
            document.addEventListener('mouseup', () => {
                if (isDragging) {
                    isDragging = false;
                    map.set('draggable', true);
                    container.style.cursor = 'default';
                }
            });
    
        }
        
        google.maps.event.addListener(infoWindow, 'domready', attachDragEvents); // Reanexa após cada atualização
        
    };

    const zoomMap = () => {
        // Verifica se há hospitalMarkers definidos e se contêm pelo menos um item
        if ((!hospitalMarkers || hospitalMarkers.length === 0) && !localPartida) {
            // return; // Não faz nada se não houver marcadores nem localização definida
        }
    
        // Define o objeto para ajustar os limites do mapa
        //Uma instância de LatLngBounds representa um retângulo em coordenadas geográficas, incluindo a que cruza o meridiano longitudinal de 180 graus.
        const bounds = new google.maps.LatLngBounds();
    
        // Adiciona a posição de cada marcador de hospital aos limites
        //marker.getPosition():retorna a posição geográfica de um marcador específico no mapa, como um objeto LatLng.
                             //Esse método recupera as coordenadas para que possam ser incluídas na área que os limites cobrem.
        
        //bounds.extend(marker.getPosition()): adiciona a posição do marcador específico aos limites do LatLngBounds
        hospitalMarkers.forEach(marker => bounds.extend(marker.getPosition()));
    
        // Adiciona a posição do marcador de localização (localPartida) aos limites, se existir
        if (localPartida) {
            bounds.extend(localPartida.getPosition());
        }
    
        //Define a janela de visualização para que contenha os limites fornecidos.
        map.fitBounds(bounds);
    
        // zoom mínimo de 10
        const minZoom = 10;

        //zoom máximo de 15
        const maxZoom = 15;

        //bounds_changed:Este evento é disparado quando os limites da janela de visualização são alterados.
        //addListenerOnce: Adiciona um ouvinte de evento que dispara apenas uma vez durante a mudança dos limites do mapa (evento bounds_changed).
        google.maps.event.addListenerOnce(map, 'bounds_changed', function() {
            if (map.getZoom() < minZoom){
                map.setZoom(minZoom);
            }

            if (map.getZoom() > maxZoom){
                map.setZoom(maxZoom);
            }


        });
    };
    

    // Adiciona marcadores de hospitais ao mapa
    const addHospitalMarkers = (hospitals) => {
        clearHospitalMarkers();
        
        const pinIcon = {
            url: '/img/iconehospital.png', // Caminho para o ícone personalizado
            scaledSize: new google.maps.Size(40, 50), // Tamanho escalado do ícone
        };
        
        
        hospitals.forEach(hospital => {
            const hospitalPosition = {
                lat: parseFloat(hospital.latitude),
                lng: parseFloat(hospital.longitude)
            };

            const marker = new google.maps.Marker({
                position: hospitalPosition,
                map: map,
                title: hospital.nome,
                icon: pinIcon
            });
            marker.hospitalId = hospital.id;
            hospitalMarkers.push(marker);
            addClickEventToMarker(marker, hospital.id, hospital.nome, hospitalPosition);
        });

        zoomMap();
    };

    const meuLocalDePartida = (place) => {
        if(localPartida != null){
            invisivel();
        }
        const pinLocalIcon = {
            url: '/img/voce.png', // Caminho para o ícone personalizado
            scaledSize: new google.maps.Size(80, 100), // Tamanho escalado do ícone
        };
        const marker = new google.maps.Marker({
            position: place.geometry.location,
            map: map, 
            title: place.name,
            icon: pinLocalIcon
        });
        localPartida = marker;

        zoomMap();
    }

    // Remove todos os marcadores
    const clearHospitalMarkers = () => {
        hospitalMarkers.forEach(marker => marker.setMap(null));
        hospitalMarkers.length = 0;
    };

    const invisivel = () =>{
        localPartida.setMap(null);
    }

    // Centraliza o mapa em uma posição específica
    const centerMap = (position) => {
        map.setCenter(position);
    };

    const meuLocalDePartidaLocAtual = (userPosition) =>{
        if(localPartida != null){
            invisivel();

        }
        const pinLocalIcon = {
            url: '/img/voce.png', // Caminho para o ícone personalizado
            scaledSize: new google.maps.Size(80, 100), // Tamanho escalado do ícone
        };
        const marker = new google.maps.Marker({
            position: userPosition,
            map: map,
            title: "Minha localização",

            icon: pinLocalIcon


        });
        localPartida = marker;
    }

    
    return {
        initMap,
        addHospitalMarkers,
        getPlacesService, 
        clearHospitalMarkers,
        centerMap,
        getMapInstance,
        meuLocalDePartida,
        meuLocalDePartidaLocAtual,
        invisivel,
        calcularERenderizarRota,
        makeInfoWindowDraggable,
        handleHospitalNavClick,
        displayHospitalsOnMap,
    };
})();



