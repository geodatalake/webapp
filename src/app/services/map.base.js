import ol from "openlayers";
import angular from 'angular';

class MapBase {
    constructor() {
        var baseLayers = [];
        this.layers = [];
        var newLayer = new ol.layer.Tile({
            title: 'Open Street Map', type: 'base', source: new ol.source.OSM({
                wrapX: true
            })
        })
        baseLayers.push(newLayer)
        this.baseLayers = baseLayers

        this.baseLayers = new ol.layer.Group({
            'title': 'Base maps',
            layers: this.baseLayers
        });
    }

        /**
         * Return layers
         *
         * returns a 2 part array of the current state of the layers on the map
         * **/
    returnLayers() {
        if (this.layers.length != 0)
            return [this.baseLayers.get('layers').getArray(), this.layers]
        else
            return [this.baseLayers.get('layers').getArray()]

    }

    /**
     * Initializes the map
     *
     */
    loadMap() {
        this.droppedLayers = new ol.layer.Group({'title': 'Dropped layers', layers: []});
        this.globalDraw;
        this.drawSource = new ol.source.Vector();
        this.drawLayer = new ol.layer.Vector({
            source: this.drawSource,
            style: new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: 'yellow',
                    width: 3
                }),
                fill: new ol.style.Fill({
                    color: 'rgba(0, 0, 255, 0.1)'
                })
            })
        });
        this.measureSource = new ol.source.Vector();

        this.measureLayer = new ol.layer.Vector({
            source: this.measureSource,
            style: new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: 'red',
                    width: 3
                }),
                fill: new ol.style.Fill({
                    color: 'rgba(0, 0, 255, 0.1)'
                })
            })
        });

        //Group base layers so they may be added to
        var container = document.getElementById('popup');
        var content = document.getElementById('popup-content');
        var closer = document.getElementById('popup-closer');


        this.overlay = new ol.Overlay(/** @type {olx.OverlayOptions} */ ({
            element: container,
            autoPan: true,
            autoPanAnimation: {
                duration: 250
            }
        }));
        //Map initialization
        var select = new ol.interaction.Select();

        var translate = new ol.interaction.Translate({
            features: select.getFeatures()
        });
        this.map = new ol.Map({

            layers: [this.baseLayers, this.droppedLayers, this.drawLayer, this.measureLayer],
            overlays: [this.overlay],
            interactions: ol.interaction.defaults({doubleClickZoom: false}),
            target: 'map',
            view: new ol.View({
                center: ol.proj.transform([-77.0369, 38.9072, -777, 38.8], 'EPSG:4326', 'EPSG:3857'),
                zoom: 14,
                minZoom: 3,
                maxZoom: 20
            })
        });
//        var dblClickInteraction;
//// find DoubleClickZoom interaction
//        this.map.getInteraction().getArray().forEach(function(interaction) {
//            if (interaction instanceof ol.interaction.DoubleClickZoom) {
//                dblClickInteraction = interaction;
//            }
//        });
//// remove from map
//        this.map.removeInteraction(dblClickInteraction);
    }

}

export default angular.module('services.map-base', [])
    .service('mapBase', MapBase)
    .name;