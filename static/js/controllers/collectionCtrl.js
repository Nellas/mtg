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
        var amt = prompt('How many to add to deck?');
        if (isNaN(amt)) {
            alert('Error: Value was not a number.');
        } else {
            $scope.deck.$add({
                name: card.name,
                color: card.color,
                type: card.type,
                image: card.image,
                deckAmount: amt
            });
        }
    };

    $scope.removeCard = function(card) {
        var amt = prompt('How Many to remove?');
        if (isNaN(amt)) {
            alert('Error: value was not a number.');
            return false;
        } else if (parseInt(card.amount) > parseInt(amt)) {
            for (var i = 0; i < $scope.collection.length; i++) {
                if ($scope.collection[i].name === card.name) {
                    $scope.collection[i].amount = parseInt($scope.collection[i].amount) - amt;
                    return $scope.collection.$save(i);
                }
            }
        }
        $scope.collection.$remove(card);
    };

    $scope.searchTerm = '';
    $scope.setSearchTerm = function(color) {
        return $scope.searchTerm = color;
    };

    $scope.chartData = [
        {
            type: "White",
            value: 79,
            color: "#D6CFA1"
        },
        {
            type: "Blue",
            value: 83,
            color: "#3A4152"
        },
        {
            type: "Black",
            value: 81,
            color: "#33272B"
        },
        {
            type: "Red",
            value: 77,
            color: "#C4674C"
        },
        {
            type: "Green",
            value: 75,
            color: "#4F6D38"
        },
        {
            type: "Colorless",
            value: 61,
            color: "#9C9E9A"
        }
    ];
});