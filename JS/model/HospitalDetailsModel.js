const HospitalModel = (() => {
    let hospitals = [];

    // Carrega os hospitais do arquivo JSON
    const carregarHospitais = () => {
        return fetch('hospitais.json')
            .then(response => response.json())
            .then(data => {
                hospitals = data;
                return hospitals;
            })
            .catch(error => {
                console.error("Erro ao carregar hospitais:", error);
                throw error;
            });
    };

    // Retorna um hospital pelo ID
    const getHospitalById = (hospitalId) => {
        return carregarHospitais()
            .then(hospitals => hospitals.find(h => h.id == hospitalId));
    };

    return {
        getHospitalById
    };
})();
