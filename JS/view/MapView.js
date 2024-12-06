// MapView.js

const MapView = (() => {
    let map;
    const hospitalMarkers = [];
    let localPartida;

    let directionsService;
    let directionsRenderer;


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
                <h4>Hospital: ${hospitalName}</h4> 
                <p>Mais informações sobre o hospital.</p>
                <button id="detailsButton">
                    Mais Detalhes
                </button>
                <button id="routeButton">
                    Traçar Rota
                </button>
            </div>`,
            ariaLabel: "",
        });
    
        maker.addListener('click', () => {
            infoWindow.open(maker.getMap(), maker);
    
            google.maps.event.addListenerOnce(infoWindow, 'domready', () => {
                // botão "Mais detalhes"
                document.getElementById('detailsButton').addEventListener('click', () => {
                    window.location.href = `detalhesHospital.html?id=${hospitalId}`;
                });
    
                // botão "Traçar Rota"
                document.getElementById('routeButton').addEventListener('click', () => {
                    showRouteOptions(infoWindow, hospitalPosition);
                });
    
                // Evento de fechamento do InfoWindow (clicar no "X")
                google.maps.event.addListener(infoWindow, 'closeclick', () => {
                    removeRoute(); // Remove a rota quando o InfoWindow for fechado
                });
    
                // Tornar o InfoWindow arrastável
                makeInfoWindowDraggable(infoWindow, maker.getMap());

                google.maps.event.addListener(infoWindow, 'domready', attachDragEvents); // Reanexa após cada atualização

            });
        });
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

    let currentRouteRenderer = null // Para armazenar a rota atual e poder substituí-la
    const showRouteOptions = (infoWindow, hospitalPosition) => {
        // Substitui o conteúdo do InfoWindow para exibir os modos de transporte
        infoWindow.setContent(`
            <div class="infowindow">
                <h4>Escolha o modo de transporte</h4>
                <button id="drivingRoute">Carro</button>
                <button id="walkingRoute">A pé</button>
                <button id="transitRoute">Transporte público</button>
                <button id="closeRouteOptions">Fechar</button>
            </div>`
        );
    
        google.maps.event.addListenerOnce(infoWindow, 'domready', () => {
            // Definir os eventos para cada opção de rota
            document.getElementById('drivingRoute').addEventListener('click', () => {
                updateRoute(hospitalPosition, 'DRIVING');
            });
            document.getElementById('walkingRoute').addEventListener('click', () => {
                updateRoute(hospitalPosition, 'WALKING');
            });
            document.getElementById('transitRoute').addEventListener('click', () => {
                updateRoute(hospitalPosition, 'TRANSIT');
            });
    
            document.getElementById('closeRouteOptions').addEventListener('click', () => {
                // Restaura o conteúdo original com as informações do hospital
                infoWindow.setContent(`
                    <div class="infowindow">
                        <h4>Hospital: ${hospitalName}</h4>
                        <p>Mais informações sobre o hospital.</p>
                        <button id="detailsButton">Mais Detalhes</button>
                        <button id="routeButton">Traçar Rota</button>
                    </div>`
                );
    
                google.maps.event.addListenerOnce(infoWindow, 'domready', () => {
                    document.getElementById('detailsButton').addEventListener('click', () => {
                        window.location.href = `detalhesHospital.html?id=${hospitalId}`;
                    });
    
                    document.getElementById('routeButton').addEventListener('click', () => {
                        showRouteOptions(infoWindow, hospitalPosition);
                    });
                });
            });
        });
    };

    // Função para atualizar a rota com o novo modo de transporte
    const updateRoute = (destination, travelMode) => {
        // Invoca a função de cálculo de rota para atualizar o modo de transporte
        calcularERenderizarRota(destination, travelMode);
    };

    const removeRoute = () => {
        if (currentRouteRenderer) {
            currentRouteRenderer.setMap(null);  // Remove a rota do mapa
            currentRouteRenderer = null;  // Limpa a variável para garantir que a próxima rota seja recalculada
        }
    }

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

    async function calcularERenderizarRota(destino, modo){
        const { DirectionsService, DirectionsRenderer } = await google.maps.importLibrary("routes");

        const directionsService = new DirectionsService();
        const directionsRenderer = new DirectionsRenderer();

        directionsRenderer.setMap(map); // Renderiza a rota no mapa

        const request = {
            origin: localPartida.getPosition(),
            destination: destino,
            travelMode: modo, 
        }

        directionsService.route(request, (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
                if (currentRouteRenderer) {
                    currentRouteRenderer.setMap(null);  // Remove a rota anterior
                }
    
                // Renderizar a nova rota
                currentRouteRenderer = new google.maps.DirectionsRenderer();
                currentRouteRenderer.setMap(map);  // map é a variável do seu mapa no Google Maps
                currentRouteRenderer.setDirections(result);
            } 
            else {
                alert("Erro ao calcular a rota: " + status);
            }
        });
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
        makeInfoWindowDraggable
    };
})();


