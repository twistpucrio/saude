//MapView.js

const MapView = (() => {

    let map;
    const hospitalMarkers = []; // Array para armazenar os marcadores de hospitais

    const renderMap = (position) => {
        if (!map) {
            map = new google.maps.Map(document.getElementById("map"), {
                zoom: 15,
                center: position,
            });
        } else {
            map.setCenter(position);
        }

        new google.maps.Marker({
            position: position,
            map: map,
            title: "Você está aqui!",
        });
    };

    const showError = (message) => {
        const mapContainer = document.getElementById("map");
        mapContainer.innerHTML = `<p style="color: red;">${message}</p>`;
    };

    //adicionando os marcadores nos hospitais que os procedimentos foram marcados pela checkbox

    // const addHospitalMarkers = (hospitals) => {
    //     hospitals.forEach(hospital => {
    //         new google.maps.Marker({
    //             position: { lat: parseFloat(hospital.latitude), lng: parseFloat(hospital.longitude) },
    //             map: map,
    //             title: hospital.nome
    //         });
    //     });
    // };

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
        renderMap,
        showError,
        addHospitalMarkers,
        clearHospitalMarkers
    };
})();
