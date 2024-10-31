const MapController = ((model, view) => {

    const buscarHospitais = () => {
        const selectedProcedures = Array.from(document.querySelectorAll("input[name='procedimento']:checked"))
            .map(checkbox => checkbox.id);

        model.carregarHospitais().then(() => {
            const hospitals = selectedProcedures.flatMap(procedureId => model.getHospitalsByProcedure(procedureId));
            view.addHospitalMarkers(hospitals);
        });
    };
    
    const init = () => {
        console.log("MapController inicializado");
    };
    
    return {
        buscarHospitais,
        init
    };

})(MapModel, MapView);
