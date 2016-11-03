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
- leaflet
- open layer

## Configuration
See the config.js file in the root directory.