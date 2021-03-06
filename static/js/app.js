/**
 * Created by luke on 8/13/15.
 */

var app = angular.module('mtg', ['ngRoute', 'firebase', 'ngAnimate']);

app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'mainCtrl'
        })

        .when('/collection', {
            templateUrl: 'views/collection.html',
            controller: 'collectionCtrl'
        })

        .when('/deck', {
            templateUrl: 'views/deck.html',
            controller: 'deckCtrl'
        })

        .when('/search', {
            templateUrl: 'views/search.html',
            controller: 'searchCtrl'
        })

        .otherwise({
            redirectTo: '/'
        })
});