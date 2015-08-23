/**
 * Created by luke on 8/15/15.
 */

var app = angular.module('mtg').controller('searchCtrl', function($scope, mainService, $firebaseArray) {

    var collectionRef = new Firebase('https://lukemtg.firebaseio.com/collection');
    $scope.collection = $firebaseArray(collectionRef);

    $scope.options = [{
            key: '1', value: '1'
        },
        {
            key: '2', value: '2'
        },
        {
            key: '3', value: '3'
        },
        {
            key: '4', value: '4'
        },
        {
            key: '5+', value: '5+'
        }];

    $scope.addCard = function(card) {
        $scope.collection.$add({
            image: card.image,
            name: card.name,
            type: card.type,
            color: card.color,
            text: card.text,
            amount: card.amount
        });
    };

   $scope.getCardData = function() {
        mainService.getCardData($scope.card).then(function(data) {
            console.log('from the controller', data);
            $scope.cards = data;
        })
    };
});