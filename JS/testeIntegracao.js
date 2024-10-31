// Função para carregar o script do Google Maps
const loadMapScript = (apiKey, libraries = []) => {
    return new Promise((resolve, reject) => {
        if (window.google && window.google.maps) {
            console.warn("Google Maps API já carregada. Ignorando novo carregamento.");
            return resolve();
        }

        const script = document.createElement("script");
        const librariesParam = libraries.length ? `&libraries=${libraries.join(",")}` : "";
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}${librariesParam}`;
        script.async = true;
        script.defer = true;

        script.onerror = () => reject(new Error("Erro ao carregar script do Google Maps."));
        document.head.appendChild(script);

        script.onload = resolve;
    });
};

let map, service, infowindow;

// Função de inicialização do mapa
async function initMap() {
    const position = { lat: -22.92799529134749, lng: -43.231810558948794 }; // Tecgraf

    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    map = new Map(document.getElementById("map"), {
        zoom: 15,
        center: position,
        mapId: "DEMO_MAP_ID",
    });

    /*
    Níveis de zoom:
        1: Mundo
        5: terra ou continente
        10: cidade
        15: ruas
        20: construções
    */

    const marker = new AdvancedMarkerElement({
        map: map,
        position: position,
        title: "Tecgraf",
    });

    // Inicializa o serviço de locais
    service = new google.maps.places.PlacesService(map);

    // Chama função de geolocalização
    document.getElementById("toggle-geolocation").addEventListener("click", getUserLocation);
    
    // Chama função de busca de locais
    document.getElementById("btnBusca").addEventListener("click", buscaPorTexto);
}

// Função para ativar geolocalização
function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const userPosition = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                map.setCenter(userPosition);
                new google.maps.Marker({
                    position: userPosition,
                    map: map,
                    title: "Minha localização",
                });
            },
            () => {
                alert("Erro ao obter localização. Verifique as permissões do navegador.");
            }
        );
    } else {
        alert("Geolocalização não é suportada neste navegador.");
    }
}

// Função para buscar por texto
function buscaPorTexto() {
    const locationInput = document.getElementById("local").value;
    const request = {
        query: locationInput,
        fields: ["name", "geometry"],
    };

    service.findPlaceFromQuery(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            const place = results[0];
            map.setCenter(place.geometry.location);
            new google.maps.Marker({
                position: place.geometry.location,
                map: map,
                title: place.name,
            });
        } else {
            alert("Local não encontrado. Tente uma nova pesquisa.");
        }
    });
}

// Carrega o script do Google Maps e inicializa o mapa
loadMapScript("AIzaSyAlcDBqiCO7sV_Uvtg4LxN0eTPO1KsAqOw", ["places"])
    .then(() => {
        console.log("Google Maps API carregada com sucesso!");
        initMap();
    })
    .catch((error) => {
        console.error(error.message);
    });
