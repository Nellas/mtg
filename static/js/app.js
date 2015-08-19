/**
 * Created by luke on 8/13/15.
 */
var app = angular.module('mtg', ['ngRoute', 'firebase']);

app.constant('fb', {
    url: '#'
});


app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'mainCtrl'

        })

        .when('/collection', {
            templateUrl: 'views/collection.html',
            controller: 'collectCtrl'
        })

        .when('/trades', {
            templateUrl: 'views/trades.html',
            controller: 'tradeCtrl'
        })

        .when('/search', {
            templateUrl: 'views/search.html',
            controller: 'searchCtrl'
        })

        .otherwise({
            redirectTo: '/'
        })
});