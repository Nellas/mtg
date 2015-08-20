/**
 * Created by luke on 8/20/15.
 */
var app = angular.module('mtg').directive('nglToggle', function() {
    return {
        templateUrl: 'templates/ngl-toggle.html',

        link: function(scope, elem, attr) {
            elem.on('click', function() {
                scope.hideInfo = !scope.hideInfo;
                scope.$apply();

            })
        }
    }


});