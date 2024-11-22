// MapView.js

const MapView = (() => {
    let map;
    const hospitalMarkers = [];
    let localPartida;


    // Inicializa o mapa e salva a instância
    const initMap = (position, mapElementId, mapOptions) => {
        
        map = new google.maps.Map(document.getElementById(mapElementId), {
            center: position,
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
                    "weight": "0.02"
                }
                // {
                //     "color": "#ffd147"
                // },
                // {
                //     "weight": "0.01"
                // },
                // {
                //     "lightness": "40"
                // },
                // {
                //     "saturation": "0"
                // }
            ]
        },
        {
            featureType: "poi",
            elementType: "labels.text.fill",
            stylers: [{ color: "#d59563" }],
        },
        {
            featureType: "poi.park",
            elementType: "geometry",
            stylers: [{ color: "#263c3f" }],
        },
        {
            featureType: "poi.park",
            elementType: "labels.text.fill",
            stylers: [{ color: "#6b9a76" }],
        },
        {
            "featureType": "poi.business",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi.medical",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            featureType: "road",
            elementType: "geometry",
            stylers: 
            [
                { color: "#38414e" },
                {"lightness": "10"}
            
            ],
        },
        {
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: [{ color: "#212a37" }],
        },
        {
            featureType: "road",
            elementType: "labels.text.fill",
            stylers: [{ color: "#9ca5b3" }],
        },
        {
            featureType: "road.highway",
            elementType: "geometry",
            stylers: [{ color: "#746855" }],
        },
        {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [{ color: "#1f2835" }],
        },
        {
            featureType: "road.highway",
            elementType: "labels.text.fill",
            stylers: [{ color: "#f3d19c" }],
        },
        {
            featureType: "transit",
            elementType: "geometry",
            stylers: [{ color: "#2f3948" }],
        },
        {
            featureType: "transit.station",
            elementType: "labels.text.fill",
            stylers: [{ color: "#d59563" }],
        },
        {
            featureType: "water",
            elementType: "geometry",
            stylers: [{ color: "#055164" }],
        },
        {
            featureType: "water",
            elementType: "labels.text.fill",
            stylers: [{ color: "#ffffff" }],
        },

        ],
        });

        

        // Inicializa o serviço de locais após o mapa estar pronto
        service = new google.maps.places.PlacesService(map);
    };

    

    const getMapInstance = () => {
        return map; // Retorna a instância do mapa
    };

    const getPlacesService = () => {
        return service; // Expor a instância de PlacesService para o Controller
    };

    const addClickEventToMarker = (maker, hospitalId) => {
        google.maps.event.addListener(maker, 'click', () =>{
            window.location.href = `detalhesHospital.html?id=${hospitalId}`;
        });
    }

    const zoomMap = () => {
        // Verifica se há hospitalMarkers definidos e se contêm pelo menos um item
        if ((!hospitalMarkers || hospitalMarkers.length === 0) && !localPartida) {
            return; // Não faz nada se não houver marcadores nem localização definida
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
            const marker = new google.maps.Marker({
                position: { lat: parseFloat(hospital.latitude), lng: parseFloat(hospital.longitude) },
                map: map,
                title: hospital.nome,
                icon: pinIcon
            });
            hospitalMarkers.push(marker);
            addClickEventToMarker(marker, hospital.id);
        });

        zoomMap();
    };

    const meuLocalDePartida = (place) => {
        if(localPartida != null){
            invisivel();
        }
        const pinLocalIcon = {
            url: '/img/voce.png', // Caminho para o ícone personalizado
            scaledSize: new google.maps.Size(150, 80), // Tamanho escalado do ícone
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
        
    };
})();


