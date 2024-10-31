//MapView.js

const MapView = (() => {

    let map;
    const hospitalMarkers = []; // Array para armazenar os marcadores de hospitais

    const addHospitalMarkers = (hospitals) => {
        clearHospitalMarkers(); // Limpa os marcadores antes de adicionar novos

        hospitals.forEach(hospital => {
            const marker = new google.maps.Marker({
                position: { lat: parseFloat(hospital.latitude), lng: parseFloat(hospital.longitude) },
                map: map,
                title: hospital.nome,
            });
            hospitalMarkers.push(marker); // Armazena o marcador no array
        });
    };

    // Função para remover todos os marcadores de hospitais
    const clearHospitalMarkers = () => {
        hospitalMarkers.forEach(marker => marker.setMap(null)); // Remove cada marcador do mapa
        hospitalMarkers.length = 0; // Limpa o array de marcadores
    };


    return {
        addHospitalMarkers,
        clearHospitalMarkers
    };
})();
