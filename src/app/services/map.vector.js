import ol from "openlayers";
import angular from 'angular';

class MapVector{

    constructor(mapBase) {
        this.map = mapBase;
    }

    /**
     * Takes a name and a kml url and adds a KML layer with the params
     *
     * @param name
     * @param kml
     */
    addKML(name, kml, cb) {
        var layer = new ol.layer.Vector({
            title: name,
            source: new ol.source.Vector({
                projection: 'EPSG:3857',
                format: new ol.format.KML(),
                url: kml
            })

        });

        this.map.map.addLayer(layer);
        this.map.layers.push(layer);

        if (cb)
            cb();

    }
    /**
     * Takes a name and a wkt array and adds a vector layer with the params
     *
     * @param name (String)
     * @param wkt (WKT Array)
     * @param cb (callBack function)
     */
    addWKT(name, wkt, cb) {
        var format = new ol.format.WKT();
        var feature = [];

        for (var i=0; i < wkt; i++) {
            feature.push(format.readFeature(wkt[i], {
                dataProjection: 'EPSG:4326',
                featureProjection: 'EPSG:3857'
            }));
        }

        var vector = new ol.layer.Vector({
            source: new ol.source.Vector({
                features: [feature]
            }),
            name: name
        });


        this.map.map.addLayer(vector);
        this.map.layers.push(vector);

        if (cb)
            cb();

    }
}
export default angular.module('services.mapVector', [])
    .service('mapVector', MapVector)
    .name;