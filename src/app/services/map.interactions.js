import angular from 'angular';
import ol from "openlayers";

class MapInteractions {

    constructor(mapBase) {
        this.map = mapBase;
        MapInteractions.drawOn = false;
    }

    drawAOI(type,func) {
        if (!MapInteractions.drawOn) {
            MapInteractions.drawOn = true;
            var sketch;
            this.globalDraw = new ol.interaction.Draw({
                source: this.map.drawSource,
                type: type
            });
            this.globalDraw.on('drawstart',
                function (evt) {
                    sketch = evt.feature;

                }, this);
            var map = this.map
            var draw = this.globalDraw;
            this.globalDraw.on("drawend", function (e) {
                func(e.feature)
                map.drawSource.clear()
                MapInteractions.drawOn = false;
                map.map.removeInteraction(draw);
            });
            this.map.map.addInteraction(this.globalDraw);

        } else {
            console.log("Stop")
            MapInteractions.drawOn = false;
            this.map.map.removeInteraction(this.globalDraw);

        }
    }
}
export default angular.module('services.map-interactions', [])
    .service('mapInteractions', MapInteractions)
    .name;