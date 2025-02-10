// Initialize the map
var map2 = L.map('map2').setView([58.678, 25.769], 7);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map2);


fetch("data/estonia1.geojson")
.then(response => response.json())
.then(json => {
    L.geoJson(json, {
        style: style, 
        onEachFeature: function(feature, layer) {
            layer.bindPopup(`<strong>County:</strong> ${feature.properties.name}<br>
                             <strong>Population:</strong> ${feature.properties.Population.toLocaleString()}<br>
                             <strong>Area:</strong> ${feature.properties.Area} km²`);
        }
    }).addTo(map2);
})
.catch(error => console.error('Error loading GeoJSON:', error));

// I referenced a YT video based on the Leaflet tutorial for this code (and modified it as such)
function getColor(Population) {
    return Population > 500000 ? '#fb236f' :
           Population > 200000 ? '#e74584' :
           Population > 100000 ? '#d15f9a' :
           Population > 50000 ? '#bd75ad' :
           Population > 30000 ? '#a58bc2' :
           Population > 15000 ? '#939bd1' :
           Population > 5000  ? '#75b1e7' :
                                '#54c3f8';
}

// I referenced a YT video based on the Leaflet tutorial for this code (and modified it as such)
function style(feature) {
    return {
        fillColor: getColor(feature.properties.Population),
        weight: 1,
        opacity: 1,
        color: 'black',
        dashArray: '0',
        fillOpacity: 0.7
    };
}
