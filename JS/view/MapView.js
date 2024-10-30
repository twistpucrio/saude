// const MapView = (() => {
//     const renderMap = (position) => {
//         const map = new google.maps.Map(document.getElementById("map"), {
//             zoom: 15,
//             center: position,
//         });

//         const marker = new google.maps.Marker({
//             position: position,
//             map: map,
//             title: "Você está aqui!",
//         });
//     };

//     const showError = (message) => {
//         const mapContainer = document.getElementById("map");
//         mapContainer.innerHTML = `<p style="color: red;">${message}</p>`;
//     };

//     return {
//         renderMap,
//         showError,
//     };
// })();
