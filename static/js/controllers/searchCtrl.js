/**
 * Created by luke on 8/15/15.
 */

var app = angular.module('mtg').controller('searchCtrl', function($scope, mainService, $firebaseObject, $firebaseArray) {

    var collectionRef = new Firebase('https://lukemtg.firebaseio.com/collection');
    $scope.collection = $firebaseArray(collectionRef);


    $scope.addCard = function(card) {
        var amt = prompt('How Many?');
        $scope.collection.$add({
            name: card.name,
            color: card.color,
            type: card.type,
            image: card.image,
            amount: amt
        })
    };

   $scope.getCardData = function() {
        setTimeout(function() {
            mainService.getCardData($scope.card).then(function(data) {
                console.log('from the controller', data);
                $scope.cards = data;
            })
        }, 250)
    };
});