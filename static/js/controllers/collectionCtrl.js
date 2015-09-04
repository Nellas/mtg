/**
 * Created by luke on 8/18/15.
 */
var app = angular.module('mtg').controller('collectionCtrl', function($scope, mainService, $firebaseArray){

    $scope.chartData = [];

    var collectionRef = new Firebase("https://lukemtg.firebaseio.com/collection");
    $scope.collection = $firebaseArray(collectionRef);
    $scope.refreshData = function() {
        $scope.collection.$loaded()
            .then(function (data) {
                $scope.collectionData = data;
                $scope.totalCards = 0;
                $scope.colorArray = [0, 0, 0, 0, 0, 0];
                data.forEach(function (data) {
                    $scope.totalCards = $scope.totalCards + parseInt(data.amount);
                    switch (data.color) {
                        case 'white':
                            $scope.colorArray[0] = $scope.colorArray[0] + parseInt(data.amount);
                            break;
                        case 'blue':
                            $scope.colorArray[1] = $scope.colorArray[1] + parseInt(data.amount);
                            break;
                        case 'black':
                            $scope.colorArray[2] = $scope.colorArray[2] + parseInt(data.amount);
                            break;
                        case 'red':
                            $scope.colorArray[3] = $scope.colorArray[3] + parseInt(data.amount);
                            break;
                        case 'green':
                            $scope.colorArray[4] = $scope.colorArray[4] + parseInt(data.amount);
                            break;
                        case 'colorless':
                            $scope.colorArray[5] = $scope.colorArray[5] + parseInt(data.amount);
                            break;
                    }
                });

                function getColorAmount(index) {
                    return Math.ceil(($scope.colorArray[index] / $scope.totalCards) * 100);
                }

                $scope.chartData = [
                    {
                        type: "White",
                        value: getColorAmount(0),
                        color: "#D6CFA1"
                    },
                    {
                        type: "Blue",
                        value: getColorAmount(1),
                        color: "#3A4152"
                    },
                    {
                        type: "Black",
                        value: getColorAmount(2),
                        color: "#33272B"
                    },
                    {
                        type: "Red",
                        value: getColorAmount(3),
                        color: "#C4674C"
                    },
                    {
                        type: "Green",
                        value: getColorAmount(4),
                        color: "#4F6D38"
                    },
                    {
                        type: "Colorless",
                        value: getColorAmount(5),
                        color: "#9C9E9A"
                    }
                ];
            })
            .catch(function (error) {
                console.error("Error:", error);
            });
    };

    $scope.refreshData();

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
            } else if (!amt) {
                return false;
            } else if (parseInt(card.amount) > parseInt(amt)) {
                for (var i = 0; i < $scope.collection.length; i++) {
                    if ($scope.collection[i].name === card.name) {
                        $scope.collection[i].amount = parseInt($scope.collection[i].amount) - amt;
                        return $scope.collection.$save(i)
                            .then(function() {
                                $scope.refreshData();
                            })
                    }
                }
            }
        $scope.collection.$remove(card);
        $scope.refreshData();
    };
    $scope.searchTerm = '';
    $scope.setSearchTerm = function(color) {
        return $scope.searchTerm = color;
    };
});