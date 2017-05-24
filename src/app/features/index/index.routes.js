routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
    $stateProvider
        .state('index', {
            url: '/',
            template: require('./index.html'),
            controller: 'IndexController',
            controllerAs: 'index'
        });
}