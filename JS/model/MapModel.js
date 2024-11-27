// MapModel.js

const MapModel = (() => {
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
            });
    };

    // Retorna hospitais que oferecem um procedimento específico
    const getHospitalsByProcedure = (procedureId) => {
        return hospitals.filter(hospital => hospital.procedimentos.includes(procedureId));
    };

    return {
        carregarHospitais,
        getHospitalsByProcedure
    };
})();
