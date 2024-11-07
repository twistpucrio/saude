// app.js

document.addEventListener('DOMContentLoaded', () => {
    const page = window.location.pathname.split("/").pop();
    if (page === "detalhesHospital.html") {
        HospitalDetailsController.init();
    }
    else
    {
        loadMapScript("AIzaSyAlcDBqiCO7sV_Uvtg4LxN0eTPO1KsAqOw", ["places"])
            .then(() => {
                console.log("Google Maps API carregada com sucesso!");
                MapController.init(); // Inicializa o controller
            })
            .catch((error) => {
                console.error(error.message);
            });
    }
    
});

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
