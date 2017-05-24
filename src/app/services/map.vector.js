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
}
export default angular.module('services.mapVector', [])
    .service('mapVector', MapVector)
    .name;