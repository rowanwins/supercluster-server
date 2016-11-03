'use strict';

var config = require('./config');

var datasource = require('./lib/load-data');
var server = require('./lib/tile-server');
var clustering = require('./lib/clustering');


function retrieveData(layer) {
    if (layer.datasource === 'db') {
        layer.dbConnection = datasource.connectToSource(layer);
        datasource.retrieveData(layer);
    } else {
        datasource.loadShp(layer);
    }
}


config.layers.forEach(function (layer) {
    retrieveData(layer);

    if (layer.refreshSuperClusterIndex) {
        setInterval(function () {
            console.log('Refreshing the supercluster index for ' + layer.name + ': ' + new Date().toLocaleString());
            var data = retrieveData(layer);
            clustering.buildClusterIndex(data.features, layer);
        }, config.refreshSuperClusterIndex);
    }

});

server.createServer(config.port);
