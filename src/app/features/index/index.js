import angular from 'angular';
import uirouter from 'angular-ui-router';
import './index.css';
import '../../../../node_modules/angular-material/angular-material.css';

import routing from './index.routes';
import IndexController from '../../controllers/IndexController';
import Map from '../../services/map.api.js';
import MapInteraction from '../../services/map.interactions.js';
import MapVector from '../../services/map.vector.js';
import MapBase from '../../services/map.base.js';


export default angular.module('app.index', [uirouter, Map, MapBase,MapInteraction,MapVector])
    .config(routing)
    .controller('IndexController', IndexController)
    .name;