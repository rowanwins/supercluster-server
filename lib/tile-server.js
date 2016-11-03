'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');

var config = require('../config');


var exports = module.exports = {};

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var port = config.port;
app.set('port', port);

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});


exports.createEndpoint = function (layer) {
    console.log('endpoint created at http://localhost:' + port + '/' + layer.name);
    app.get('/' + layer.name + '/:min_x/:max_x/:min_y/:max_y/:zoom', function (req, res) {
        var minX = req.params.min_x;
        var maxX = req.params.max_x;

        var minY = req.params.min_y;
        var maxY = req.params.max_y;

        var zoom = req.params.zoom;
        res.send(layer.clusterIndex.getClusters([minY, minX, maxY, maxX], zoom));
    });
};


exports.createServer = function (port) {
    http.createServer(app).listen(port, function () {
        console.log('Server listening on port ' + port);
    });
};
