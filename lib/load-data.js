'use strict';

var shp = require('gtran-shapefile');
var knex = require('knex');

var geojsonUtils = require('./geojson-utils');
var clustering = require('./clustering');

var exports = module.exports = {};

exports.connectToSource = function (layer) {
    return knex(layer.knexConfig);
};

exports.retrieveData = function (layer) {
    layer.dbConnection.select()
    .from(layer.tableName)
    .then(function (rows) {
        console.log('Data loaded for ' + layer.name);
        var fc = geojsonUtils.dataToGeoJSON(rows, layer);
        clustering.buildClusterIndex(fc.features, layer);
    })
    .catch(function (error) { console.error(error); });
};

exports.loadShp = function (layer) {
    shp.toGeoJson(layer.datasource)
    .then(function (data) {
        console.log('Data loaded for ' + layer.name);
        clustering.buildClusterIndex(data.features, layer);
    });
};
