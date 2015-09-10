/**
 * Created by luke on 8/15/15.
 */
var app = angular.module('mtg').controller('searchCtrl', function($scope, mainService, $firebaseObject, $firebaseArray) {

    var collectionRef = new Firebase('https://lukemtg.firebaseio.com/collection');
    $scope.collection = $firebaseArray(collectionRef);

    $scope.addCard = function(card) {
        var amt = prompt('How Many?');
        if (isNaN(amt)) {
            alert('Error: Value was not a number');
            return false;
        } else {
        for (var i = 0; i < $scope.collection.length; i++)
        {
            if ($scope.collection[i].name === card.name) {
                $scope.collection[i].amount = parseInt($scope.collection[i].amount) + parseInt(amt);
                return $scope.collection.$save(i);
                }
            }
        }
            $scope.collection.$add({
            name: card.name,
            color: card.color,
            type: card.type,
            image: card.image,
            amount: amt
            })
        };

   $scope.getCardData = function() {
            mainService.getCardData($scope.card).then(function(data) {
                $scope.cards = data;
            })
   };
});