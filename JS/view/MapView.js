// MapView.js

const MapView = (() => {
    let map;
    const hospitalMarkers = [];

    // Inicializa o mapa e salva a instância
    const initMap = (position, mapElementId, mapOptions) => {
        
        map = new google.maps.Map(document.getElementById(mapElementId), {
            zoom: mapOptions.zoom,
            center: position,
            mapId: mapOptions.mapId,
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

    // Adiciona marcadores de hospitais ao mapa
    const addHospitalMarkers = (hospitals) => {
        clearHospitalMarkers();
        hospitals.forEach(hospital => {
            const marker = new google.maps.Marker({
                position: { lat: parseFloat(hospital.latitude), lng: parseFloat(hospital.longitude) },
                map: map,
                title: hospital.nome,
            });
            hospitalMarkers.push(marker);
            addClickEventToMarker(marker, hospital.id);
        });
    };

    // Remove todos os marcadores
    const clearHospitalMarkers = () => {
        hospitalMarkers.forEach(marker => marker.setMap(null));
        hospitalMarkers.length = 0;
    };

    // Centraliza o mapa em uma posição específica
    const centerMap = (position) => {
        map.setCenter(position);
    };

    return {
        initMap,
        addHospitalMarkers,
        getPlacesService, 
        clearHospitalMarkers,
        centerMap,
        getMapInstance
    };
})();
