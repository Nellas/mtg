/**
 * Created by luke on 8/15/15.
 */

var app = angular.module('mtg').controller('deckCtrl', function($scope, mainService, $firebaseArray) {

    var deckRef = new Firebase('https://lukemtg.firebaseio.com/deck');
    $scope.deck = $firebaseArray(deckRef);
    $scope.totalDeckCards = 0;
    $scope.sampleHand = [];
    $scope.deck.$loaded()
        .then(function(data) {
            $scope.deckData = data;
            for (var i = 0; i < data.length; i++) {
                $scope.totalDeckCards += parseInt(data[i].deckAmount);
            }
        })
        .catch(function(error) {
            console.error("Error:", error);
        });

    $scope.removeCard = function(card) {
        $scope.totalDeckCards = $scope.totalDeckCards - card.deckAmount;
        $scope.deck.$remove(card);
    };

    function getRandNum() {
        return Math.floor((Math.random() * $scope.deckData.length));
    }


    $scope.drawHand = function(deck) {
        for (var i = 0; i < 7; i++) {
            $scope.sampleHand.push(deck.splice(getRandNum(), 1)[0]);
        }
        console.log($scope.sampleHand);
        return $scope.sampleHand;
    }

});