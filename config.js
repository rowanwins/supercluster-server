'use strict';

var path = require('path');

module.exports = {
    layers: [
        {
            name: 'randomPoints',
            datasource: path.join(__dirname, '\\test\\points.shp'),
            // refreshSuperClusterIndex: 100000,
            clusterRadius: 60,
            maxZoomLevelClustering: 17
        }
        // {
        //     name: 'dbPoints',
        //     datasource: 'db',
        //     tableName: 'sampleClusterData',
        //     latField: 'lat',
        //     lonField: 'lon',
        //     knexConfig: {
        //         client: 'pg',
        //         connection: {
        //             host: '127.0.0.1',
        //             port: '5432',
        //             user: 'postgres',
        //             password: 'postgres',
        //             database: 'postgres'
        //         }
        //     },
        //     clusterRadius: 60,
        //     maxZoomLevelClustering: 17
        // }
    ],
    port: 7777
};
