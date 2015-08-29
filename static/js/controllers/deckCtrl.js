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

    // I create an array of all cards including duplicates, then shuffle that array and "draw" 7 cards.
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
        // Shuffle the fullDeck array
        var l = fullDeck.length, m, n;

        // While there remain elements to shuffle pick a remaining element and swap it with the current element.
        while(l) {
            n = Math.floor(Math.random() * l--);
            m = fullDeck[l];
            fullDeck[l] = fullDeck[n];
            fullDeck[n] = m;
        }
        // Draw top seven cards
        for (var o = 0; o < 7; o++) {
            $scope.sampleHand.push(fullDeck[o]);
        }
        return $scope.sampleHand;
    }

});