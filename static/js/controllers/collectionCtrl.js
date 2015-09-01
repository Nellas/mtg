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

    //var ctx = $("#myChart").get(0).getContext("2d");
    //var myNewChart = new Chart(ctx).Bar(data, Chart.defaults.global.responsive = true);
    //
    //var data = {
    //    labels: ['White', 'Blue', 'Black', 'Red', 'Green', 'Colorless' ],
    //    datasets: [
    //        {
    //            label: "My First dataset",
    //            fillColor: "rgba(220,220,220,0.5)",
    //            strokeColor: "rgba(220,220,220,0.8)",
    //            highlightFill: "rgba(220,220,220,0.75)",
    //            highlightStroke: "rgba(220,220,220,1)",
    //            data: [65, 59, 80, 81, 56, 55, 40]
    //        },
    //        {
    //            label: "My Second dataset",
    //            fillColor: "rgba(151,187,205,0.5)",
    //            strokeColor: "rgba(151,187,205,0.8)",
    //            highlightFill: "rgba(151,187,205,0.75)",
    //            highlightStroke: "rgba(151,187,205,1)",
    //            data: [28, 48, 40, 19, 86, 27, 90]
    //        }
    //    ]
    //};
});