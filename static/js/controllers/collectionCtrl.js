/**
 * Created by luke on 8/18/15.
 */

var app = angular.module('mtg').controller('collectionCtrl', function($scope, mainService, $firebaseArray){

    var collectionRef = new Firebase("https://lukemtg.firebaseio.com/collection");
    $scope.collection = $firebaseArray(collectionRef);
    $scope.collection.$loaded()
        .then(function(data) {
            $scope.collectionData = data;
        })
        .catch(function(error) {
            console.error("Error:", error);
        });

    var deckRef = new Firebase("https://lukemtg.firebaseio.com/deck");
    $scope.deck = $firebaseArray(deckRef);

    $scope.addCard = function(card) {
        $scope.deck.$add({
            image: card.image,
            name: card.name,
            type: card.type,
            color: card.color,
            text: card.text,
            deckAmount: card.deckAmount
        });
    };

    $scope.removeCard = function(card) {
        $scope.collection.$remove(card);
    };

    $scope.searchTerm = '';
    $scope.setSearchTerm = function(color) {
        return $scope.searchTerm = color;
    };

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
        }];
});