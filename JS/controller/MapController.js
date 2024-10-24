const MapController = ((model, view) => {
    const init = () => {
        model.loadMapScript()
            .then(() => {
                model.getUserPosition()
                    .then((position) => {
                        console.log("Posição do usuário ou padrão:", position);
                        view.renderMap(position);
                    })
                    .catch((error) => {
                        console.error("Erro ao carregar o mapa:", error);
                        view.showError("Não foi possível obter a localização do usuário.");
                    });
            })
            .catch((error) => {
                console.error("Erro ao carregar script do Google Maps:", error);
                view.showError("Erro ao carregar o Google Maps.");
            });
    };

    return {
        init,
    };
})(MapModel, MapView);
