import '../../node_modules/bootstrap/dist/css/bootstrap.css';

import angular from 'angular';
import routing from './app.config';
import index from './features/index';
import uirouter from 'angular-ui-router';
import material from 'angular-material';

angular.module('app', [uirouter, index, material])
    .config(routing);