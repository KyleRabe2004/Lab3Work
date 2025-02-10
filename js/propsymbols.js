// Initialize the map
var map = L.map('map').setView([58.678, 25.769], 7);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// I referenced ChatGPT to how to make layers seperate
var countyLayer = L.geoJson(null, { 
    style: { fillColor: "#cccccc", fillOpacity: 0.4, color: "gray", weight: 1 } 
}).addTo(map);

var symbolLayer = L.layerGroup().addTo(map);

fetch("data/estonia1.geojson")
.then(response => response.json())
.then(json => {
    countyLayer.addData(json); 
    createPropSymbols(json);  
})
.catch(error => console.error('Error loading GeoJSON:', error));

// I referenced the textbook on how to make Prop Symbols
function createPropSymbols(data) {
    var attribute = "Population"; 

    L.geoJson(data, {
        onEachFeature: function (feature, layer) {
            if (feature.geometry.type === "Polygon" || feature.geometry.type === "MultiPolygon") {
                let latlng;
                
                // I used ChatGPT to help with this turf part 
                var center = turf.centerOfMass(feature);  
                latlng = [center.geometry.coordinates[1], center.geometry.coordinates[0]];

                var attValue = Number(feature.properties[attribute]);
                if (!attValue || isNaN(attValue)) return;

                var radius = Math.sqrt(attValue) * 0.02;

                var circleMarker = L.circleMarker(latlng, {
                    radius: radius,
                    fillColor: "green",
                    color: "black",
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0.6
                }).bindPopup(`<strong>County:</strong> ${feature.properties.name}<br>Population: ${attValue.toLocaleString()}<br>Area: ${feature.properties.Area} km²`);

                symbolLayer.addLayer(circleMarker); 
            }
        }
    });
}
