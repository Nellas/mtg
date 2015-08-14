/**
 * Created by luke on 8/13/15.
 */
var app = angular.module('mtg', ['ng-route']).config(function($routeProvider) {

    $routeProvider
        .when('/', {
            templateUrl:'',
            controller: ''

        })

        .when('/collection', {
            templateUrl:'',
            controller: ''
        })

        .when('/trades', {
            templateUrl:'',
            controller: ''
        })

        .otherwise({
            redirectTo: '/'
        })
});