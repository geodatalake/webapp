import angular from 'angular';

class Map {
    constructor(mapBase, mapInteractions, mapVector) {
        this.base = mapBase;
        this.interactions = mapInteractions;
        this.vector = mapVector;
    }
    /**
     * Return layers
     *
     * returns a 2 part array of the current state of the layers on the map
     * **/

    returnLayers(){
        var layers = this.base.returnLayers()
        return layers;
    }

    /**
     * Initializes the map
     *
     */
    loadMap(){
       this.base.loadMap()
    }

    /**
     * Takes a draw type, which is a polygon or a circle and a return function.
     * Draws on the map and returns the drawn feature
     *
     * @param type
     * @param func
     */
    drawAOI(type, func) {
        this.interactions.drawAOI(type, func)
    }

    /**
     * Takes a name and a kml url and adds the layer to the map. Optional callback function
     * to do things after the layer is added.
     *
     * @param name @param kml @param cb
     */
    addKML(name, kml,cb) {
        this.vector.addKML(kml,cb)
    }


}

export default angular.module('services.map', [])
    .service('map', Map)
    .name;