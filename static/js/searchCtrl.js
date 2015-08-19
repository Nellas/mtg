/**
 * Created by luke on 8/15/15.
 */
var app = angular.module('mtg').controller('searchCtrl', function($scope, mainService) {

   $scope.getCardData = function() {
        mainService.getCardData($scope.card).then(function(data) {
            console.log('from the controller', data);
            $scope.cards = data;
        })
    };
    $scope.getCardData();
});