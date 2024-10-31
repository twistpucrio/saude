//MapModel.js

const MapModel = (() => {
    let hospitals = [];

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
        getHospitalsByProcedure,
        carregarHospitais
    };
})();
