// chave api
/* AIzaSyAlcDBqiCO7sV_Uvtg4LxN0eTPO1KsAqOw */

// (g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});
//     var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>
//     {await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.
//     set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);
//     a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));
//     a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g)
//     :d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})({
//     key: "AIzaSyAlcDBqiCO7sV_Uvtg4LxN0eTPO1KsAqOw",
//     v: "weekly",
//     // Use the 'v' parameter to indicate the version to use (weekly, beta, alpha, etc.).
//     // Add other bootstrap parameters as needed, using camel case.
//   });

  // Função para carregar o script do Google Maps
const loadMapScript = (apiKey, libraries = []) => {
    return new Promise((resolve, reject) => {
        // Verifica se o Google Maps API já está carregado
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

        // Define o callback global para inicializar o mapa após o carregamento do script
        script.onload = resolve;
    });
};

// // Exemplo de uso:
// loadMapScript("AIzaSyAlcDBqiCO7sV_Uvtg4LxN0eTPO1KsAqOw", ["places"])
//     .then(() => {
//         console.log("Google Maps API carregada com sucesso!");
//         // Inicialize o mapa aqui
//     })
//     .catch((error) => {
//         console.error(error.message);
//     });

// Initialize and add the map
let map, service, infowindow;

/*
    A palavra-chave async em JavaScript indica que uma função é assíncrona. Isso significa que ela pode conter operações que levam tempo, 
    como chamadas de API ou operações de leitura de arquivos, sem bloquear a execução do restante do código. Quando uma função é marcada como async, 
    ela retorna automaticamente uma Promise, o que permite que você use await dentro dela para esperar pela resolução de outras Promises. 
*/

async function initMap() {
    
    // The location of Tecgraf
    const position = { lat: -22.92799529134749, lng: -43.231810558948794 }; // Tecgraf 
    

    // Request needed libraries.
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    // The map, centered at Tecgraf
    map = new Map(document.getElementById("map"), {
        zoom: 15,
        center: position,
        mapId: "DEMO_MAP_ID",
    });

    /*
    Níveis de zoom:
        1: Mundo
        5: terra ou continente
        10: cidade
        15: ruas
        20: construções
    */

    // The marker, positioned at Uluru
    const marker = new AdvancedMarkerElement({
        map: map,
        position: position,
        title: "Tecgraf",
    });

    var request = {
        query: 'copacabana',
        fields: ['name', 'geometry'],
    }

    var service = new google.maps.places.PlacesService(map);

    service.findPlaceFromQuery(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            const place = results[0];
            map.setCenter(place.geometry.location);
            new google.maps.Marker({
                position: place.geometry.location,
                map: map,
                title: place.name,
            });
        }
    });
}

// Exemplo de uso
loadMapScript("AIzaSyAlcDBqiCO7sV_Uvtg4LxN0eTPO1KsAqOw", ["places"])
    .then(() => {
        console.log("Google Maps API carregada com sucesso!");
        initMap();  // Inicializa o mapa após o carregamento
    })
    .catch((error) => {
        console.error(error.message);
    });