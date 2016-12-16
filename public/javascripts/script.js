angular.module('stuckyToys').config(stuckyToysState);

stuckyToysState.$inject = ['$stateProvider', '$urlRouterProvider'];

function stuckyToysState($stateProvider, $urlRouterProvider){

    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: '/home.html',
            controller: 'AnimalController',
            controllerAs : 'ctrl',
        })
        .state('stories', {
            url: '/stories',
            templateUrl: '/stories.html',
            controller: 'StoriesController',
            controllerAs: 'ctrl'
        })
        .state('story', {
            url: '/stories/{id}',
            templateUrl: '/story.html',
            controller: 'StoryController',
            controllerAs: 'ctrl',
        })
        .state('theme', {
            url: '/theme',
            templateUrl: '/theme.html',
            controller: 'ThemeController',
            controllerAs: 'ctrl'
        })

    $urlRouterProvider.otherwise('home');

}

