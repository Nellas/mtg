/**
 * Created by luke on 8/15/15.
 */

var app = angular.module('mtg').controller('deckCtrl', function($scope, mainService, $firebaseArray) {

    var deckRef = new Firebase('https://lukemtg.firebaseio.com/deck');
    $scope.deck = $firebaseArray(deckRef);
    $scope.totalDeckCards = 0;
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

    $scope.showCardImage = function(card) {
        return $scope.displayedImage = card.image;
    };

    function getRandNum() {
        return Math.floor((Math.random() * $scope.deckData.length));
    }


    $scope.drawHand = function(deck) {
        $scope.sampleHand = [];
        var fullDeck = [];
        for (var j = 0; j < deck.length; j++) {
            if (parseInt(deck[j].deckAmount) === 1) {
                fullDeck.push(deck[j]);
            } else if (parseInt(deck[j].deckAmount) > 1) {
                for (var k = 1; k <= parseInt(deck[j].deckAmount); k++) {
                    fullDeck.push(deck[j].image);
                }
            }
        }
        console.log('full Deck', fullDeck);
        for (var i = 0; i < 7; i++) {
            $scope.sampleHand.push(fullDeck.splice(getRandNum(), 1)[0]);
        }
        return $scope.sampleHand;
    }

});