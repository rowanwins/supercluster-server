'use strict';

/*global L */

var map = L.map('map').setView([0, 0], 2);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var markers = L.geoJson(null, {
    pointToLayer: createClusterIcon
}).addTo(map);

function updateMarkers (data) {
    markers.clearLayers();
    markers.addData(data);
};

function update() {
    var bounds = map.getBounds();
    var zoom = map.getZoom()
    getJSON(bounds, zoom, updateMarkers)
}

map.on('moveend', update);

function createClusterIcon(feature, latlng) {
    if (!feature.properties.cluster) return L.marker(latlng);

    var count = feature.properties.point_count;
    var size =
        count < 100 ? 'small' :
        count < 1000 ? 'medium' : 'large';
    var icon = L.divIcon({
        html: '<div><span>' + feature.properties.point_count_abbreviated + '</span></div>',
        className: 'marker-cluster marker-cluster-' + size,
        iconSize: L.point(40, 40)
    });
    return L.marker(latlng, {icon: icon});
}

function getJSON(bounds, zoom, callback) {
    var xhr = new XMLHttpRequest();
    var urlparams = bounds._southWest.lat +'/' + bounds._northEast.lat + '/'+ bounds._southWest.lng + '/'+ bounds._northEast.lng+'/'+zoom;
    xhr.open('GET', 'http://localhost:7777/randomPoints/' + urlparams, true);
    xhr.responseType = 'json';
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 300 && xhr.response) {
            callback(xhr.response);
        }
    };
    xhr.send();
}