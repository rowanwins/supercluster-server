'use strict';

var turfHelpers = require('@turf/helpers');

var exports = module.exports = {};

exports.dataToGeoJSON = function (data, layer) {
    var points = [];
    data.forEach(function (item) {
        var lon = item[layer.lonField];
        var lat = item[layer.latField];
        delete item[layer.lonField];
        delete item[layer.latField];
        points.push(turfHelpers.point([parseInt(lon), parseInt(lat)], item));
    });
    return turfHelpers.featureCollection(points);
};
