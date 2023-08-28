let h2 = document.querySelector('h2');
var map;
var marker;

function success(pos) {
    console.log(pos.coords.latitude, pos.coords.longitude);
    h2.textContent = `Latitude: ${pos.coords.latitude}, Longitude: ${pos.coords.longitude}`;

    if (map === undefined) {
        map = L.map('mapid').setView([pos.coords.latitude, pos.coords.longitude], 15);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap'
        }).addTo(map);

        marker = L.marker([pos.coords.latitude, pos.coords.longitude]).addTo(map)
            .bindPopup('Localização Atual')
            .openPopup();
    } else {
        marker.setLatLng([pos.coords.latitude, pos.coords.longitude]); // Atualizar posição do marcador
        map.setView([pos.coords.latitude, pos.coords.longitude], map.getZoom()); // Manter o zoom atual
    }
}

function error(error) {
    console.log(error);
    h2.textContent = `Usuário não permitiu rastreamento`;
}

var watchID = navigator.geolocation.watchPosition(success, error);
