let h2 = document.querySelector('h2');
var map;
var savedZoom = 15; // Nível de zoom inicial
var savedCenter = [0, 0]; // Coordenadas do centro inicial

function success(pos) {
    console.log(pos.coords.latitude, pos.coords.longitude);
    h2.textContent = `Latitude: ${pos.coords.latitude}, Longitude: ${pos.coords.longitude}`;

    savedCenter = [pos.coords.latitude, pos.coords.longitude]; // Salvar novas coordenadas

    if (map === undefined) {
        map = L.map('mapid').setView(savedCenter, savedZoom);
    } else {
        map.remove();
        map = L.map('mapid').setView(savedCenter, savedZoom);
    }

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map);

    L.marker(savedCenter).addTo(map)
        .bindPopup('Localização Atual')
        .openPopup();
}

function error(error) {
    console.log(error);
    h2.textContent = `Usuário não permitiu rastreamento`;
}

var watchID = navigator.geolocation.watchPosition(success, error);
