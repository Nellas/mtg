/**
 * Created by luke on 8/13/15.
 */
var app = angular.module('mtg', ['ngRoute']).config(function($routeProvider) {

    $routeProvider
        .when('/', {
            templateUrl:'static/templates/homeTemplate.html',
            controller: 'mainCtrl'

        })

        .when('/collection', {
            templateUrl:'static/templates/collectionTemplate.html',
            controller: 'collectCtrl'
        })

        .when('/trades', {
            templateUrl:'static/templates/tradesTemplate.html',
            controller: 'tradeCtrl'
        })

        .otherwise({
            redirectTo: '/'
        })
});