// MapView.js

const MapView = (() => {
    let map;
    const hospitalMarkers = [];
    let localPartida;


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
            url: '/img/hospital.png', // Caminho para o ícone personalizado
            scaledSize: new google.maps.Size(30, 30), // Tamanho escalado do ícone
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
        const marker = new google.maps.Marker({
            position: place.geometry.location,
            map: map, 
            title: place.name,
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
        const marker = new google.maps.Marker({
            position: userPosition,
            map: map,
            title: "Minha localização",
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
        invisivel
    };
})();
