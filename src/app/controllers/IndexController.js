import ol from "openlayers";

export default
class IndexController {
    constructor(map, $http) {
        this.map = map;
        IndexController.map = map;
        this.date = {start: new Date(), end: new Date()}
        this.files = [{label: "geotiff"}, {label: "lidar"}, {label: "vector"}]
        this.file = this.files[0];
        this.result;
        this.http = $http;
        this.openBar = true;
        this.switcherShow = false;
        this.baseLayers = this.map.returnLayers()[0];
        this.layerImgSrc = "./images/layer-switcher.png";

        for (var i = 0; i < this.baseLayers.length; i++) {

            if (this.baseLayers[i].getVisible() == true)
                this.selectedBaseLayer = this.baseLayers[i].get('title');
        }

        setTimeout(function () {
            IndexController.map.loadMap()
        }, 100)
    }

    submit() {

        var data = {
            bbox: IndexController.extent,
            date: this.date,
            fileType: this.file
        }
        this.http.post("/submit", {form: data}, function (err, httpResponse, body) {
            IndexController.result = JSON.parse(body);
            map.addWKT("WKT Layer", IndexController.result.wkt, function(){
                IndexController.layers = this.map.returnLayers()[1];
            })
        });
    }

    /**
     * Takes a draw type, which is a polygon or a circle and a return function.
     * Draws on the map and returns the drawn feature
     *
     * @param type
     * @param func
     */

    drawAOI(type) {
        var callback = function (feature) {
            IndexController.extent = feature.getGeometry().getExtent();
            IndexController.extent = ol.proj.transformExtent(IndexController.extent, 'EPSG:3857', 'EPSG:4326');

        }
        this.map.drawAOI(type, callback)
    }

    /**
     * Toggles the visibility of a layer
     *
     * @param layer
     */
    toggleLayer(layer) {
        layer.setVisible(!layer.getVisible())
    }

    /**
     * Toggle the base layer. One base layer can be on at a time and must be on.
     *
     * @param layer
     */
    toggleBaseLayer(layer) {
        for (var i = 0; i < this.baseLayers.length; i++) {
            this.baseLayers[i].setVisible(false)
        }

        layer.setVisible(true)
        this.selectedBaseLayer = layer.get('title');

    }

    /**
     * Toggle the visibility of the bar on the left
     *
     */
    toggleLeftBar() {
        this.openBar = !this.openBar;
    }

    /**
     * Watcher function for date range changes to make sure that the end date
     * can't be before the start.
     *
     */
    dateChange(){
        if (this.date.start.getTime() > this.date.end.getTime())
            this.date.end = this.date.start;
    }


}