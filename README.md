# supercluster-server
Generate supercluster services for use in apps for various sources including flat files and databases.

## Installation
```
git clone https://github.com/rowanwins/supercluster-server
cd supercluster-server
npm install

// if connecting to a db also install knex db driver
npm install pg --save
```

## Client side implementations
supercluster-server sends geojson to the client that needs to be interpreted by your mapping library of choice.

*Planned implementations*
- leaflet plugin

## Configuration
See the config.js file in the root directory.

## Services
Each layer is available at a particular endpoint. Params must be sent containing the map bounds
````
    // eg the endpoint is available at - 'http://localhost:7777/layer.name/minX/maxX/minY/maxY/zoom'
    // so in the client you do something like
    var urlparams = bounds._southWest.lat +'/' + bounds._northEast.lat + '/'+ bounds._southWest.lng + '/'+ bounds._northEast.lng+'/'+zoom;
    xhr.open('GET', 'http://localhost:7777/randomPoints/' + urlparams, true);
````