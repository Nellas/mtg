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
        console.log(card);
        var amt = prompt('How Many to remove?');
        if (isNaN(amt)) {
            alert('Error: value was not a number.');
            return false;
        } else if (parseInt(card.amount) > parseInt(amt)) {
            card.amount = amt;
        } else {
            $scope.collection.$remove(card);
        }
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

    $scope.chartData = [
        {   x: 0,
            val_0: 0
        },
        {
            x: 1,
            val_0: 44
        },
        {
            x: 2,
            val_0: 61
        },
        {
            x: 3,
            val_0: 49
        },
        {
            x: 4,
            val_0: 54
        },
        {
            x: 5,
            val_0: 49
        },
        {
            x: 6,
            val_0: 31
        }

    ];

    $scope.chartOptions = {
        stacks: [
            {
                axis: "y",
                series: [
                    0,
                    "id_0"
                ]
            }
        ],
        lineMode: "cardinal",
        series: [
            {
                id: "id_0",
                y: "val_0",
                label: "tom",
                type: "column",
                color: "tomato"
            }
        ],
        tooltip: {mode: 'scrubber', formatter: function(x, y, series) {return 'Total';}},
        drawLegend: false,
        drawDots: false,
        columnsHGap: 5
    };

});