// const MapController = ((model, view) => {

//     let isGeolocationEnabled = false;

//     const init = () => {
//         setupToggleGeolocationButton();  // Chama a função para configurar o botão de geolocalização
//         model.loadMapScript()
//             .then(() => {
//                 renderMapBasedOnGeolocation();
//             })
//             .catch((error) => {
//                 console.error("Erro ao carregar script do Google Maps:", error);
//                 view.showError("Erro ao carregar o Google Maps.");
//             });
//     };

//     const checkGeolocationPermission = () => {
//         if (navigator.permissions){
//             // para verificar se o usuário concedeu, negou ou ainda não foi perguntado sobre a permissão de geolocalização.
//             navigator.permissions.query( {name: 'geolocation'} )
//                 .then(PermissionStatus => {
//                     if (PermissionStatus.state === 'granted'){
//                         isGeolocationEnabled = true;
//                         renderMapBasedOnGeolocation();
//                     }
//                     else if (PermissionStatus.state === 'prompt'){
//                         // permissão será solicitada ao usuário
//                         isGeolocationEnabled = false;
//                         renderMapBasedOnGeolocation();
//                     }
//                     else{
//                         // Estado 'denied'
//                         alert("A geolocalização foi negada no navegador. Permita-a nas configurações para usar esta função.");
//                         isGeolocationEnabled = false;
//                         renderMapBasedOnGeolocation();
//                     }

//                     // Atualiza o botão se o status da permissão mudar
//                     PermissionStatus.onchange = () => {
//                         checkGeolocationPermission();
//                     }
//                 })
//         } else{
//             console.warn("API Permissions não é suportada neste navegador.")
//             renderMapBasedOnGeolocation();
//         }
//     }

//     const renderMapBasedOnGeolocation = () => {
//         if (isGeolocationEnabled) {
//             model.getUserPosition()
//                 .then((position) => {
//                     view.renderMap(position);
//                 })
//                 .catch(() => {
//                     view.renderMap(model.getDefaultPosition());
//                 });
//         } else {
//             view.renderMap(model.getDefaultPosition());
//         }
//     };

//     const setupToggleGeolocationButton = () => {
//         const toggleButton = document.getElementById("toggle-geolocation")
//         toggleButton.addEventListener("click", () => {
//             isGeolocationEnabled = !isGeolocationEnabled;
//             toggleButton.textContent = isGeolocationEnabled ? "Desativar Geolocalização" : "Ativar Geolocalização";
//             renderMapBasedOnGeolocation();
//         })
//     }

//     return {
//         init,
//     };

// })(MapModel, MapView);
