'use strict';

var supercluster = require('supercluster');
var server = require('./tile-server');

var exports = module.exports = {};

exports.buildClusterIndex = function (geojson, layer) {
	console.log('creating index for ' + layer.name);
    layer.clusterIndex =  supercluster({
        radius: layer.clusterRadius,
        maxZoom: layer.maxZoomLevelClustering
    }).load(geojson);

    server.createEndpoint(layer);
};
