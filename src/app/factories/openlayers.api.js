app.factory('map', function (mapVector, mapBase, mapInteractions) {
    var mapApi = angular.extend({},mapVector,mapBase, mapInteractions);
    return mapApi;
});