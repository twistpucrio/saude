//MapModel.js

const MapModel = (() => {
    const apiKey = "AIzaSyAlcDBqiCO7sV_Uvtg4LxN0eTPO1KsAqOw"; // Substitua pela chave da API
    let hospitals = [];

    const loadMapScript = () => {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src=`https://maps.googleapis.com/maps/api/js?key=${apiKey}&loading=async&libraries=places&callback=initMap`;
            script.async = true;
            script.defer = true;
            script.onerror = () => reject(new Error("Erro ao carregar script do Google Maps."));
            document.head.appendChild(script);
            window.initMap = resolve; // Callback quando o mapa for carregado
        });
    };

    // Função para obter a posição atual do usuário
    const getUserPosition = () => {
        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const userPosition = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        };
                        resolve(userPosition);
                    },
                    (error) => {
                        console.error("Erro ao obter geolocalização:", error);
                        // Caso não consiga a geolocalização, retorna a posição padrão
                        resolve(getDefaultPosition());
                    }
                );
            } else {
                // Caso o navegador não suporte geolocalização
                console.warn("Geolocalização não é suportada pelo navegador.");
                resolve(getDefaultPosition());
            }
        });
    };

    const getDefaultPosition = () => {
        return { lat: -22.928784393500653, lng: -43.235268365305984 }; // Posição default
    }; 


    //Parte de marcar os hospitais com tal procedimento no mapa

    const carregarHospitais = () => {
        return fetch('hospitais.json')
            .then(response => response.json())
            .then(data => {
                hospitals = data;
                return hospitals;
            })
            .catch(error => {
                console.error("Erro ao carregar hospitais:", error);
            });
    };
    
    const getHospitalsByProcedure = (procedureId) => {
        return hospitals.filter(hospital => hospital.procedimentos.includes(procedureId));
    };

    return {
        loadMapScript,
        getUserPosition,
        getDefaultPosition,
        getHospitalsByProcedure,
        carregarHospitais
    };
})();
