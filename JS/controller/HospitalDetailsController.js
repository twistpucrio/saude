const HospitalDetailsController = ((model, view) => {
    const init = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const hospitalId = urlParams.get('id');

        if (hospitalId) {
            model.getHospitalById(hospitalId)
                .then(hospital => {
                    if (hospital) {
                        view.displayHospitalDetails(hospital);
                    } else {
                        view.displayError("Hospital não encontrado.");
                    }
                })
                .catch(() => {
                    view.displayError("Erro ao carregar os detalhes do hospital.");
                });
        } else {
            view.displayError("ID do hospital não fornecido.");
        }
    };

    const loadDetails = (hospitalId) => {
        model.getHospitalById(hospitalId)
            .then(hospital => {
                if (hospital) {
                    view.displayHospitalDetails(hospital);
                } else {
                    view.displayError("Hospital não encontrado.");
                }
            })
            .catch(() => {
                view.displayError("Erro ao carregar os detalhes do hospital.");
            });
    };

    return {
         init,
         loadDetails 
    };
    
})(HospitalModel, HospitalDetailsView);
