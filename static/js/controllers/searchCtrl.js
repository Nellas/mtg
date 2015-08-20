/**
 * Created by luke on 8/15/15.
 */
var app = angular.module('mtg').controller('searchCtrl', function($scope, mainService, $firebaseObject, $firebaseArray) {

    //Firebase
    var ref = new Firebase('https://lukemtg.firebaseio.com/collection');

    var syncObject = $firebaseObject(ref);

    syncObject.$bindTo($scope, "addCard()");

    $scope.collection = $firebaseArray(ref);

    $scope.addCard = function() {
        $scope.collection.$add({
            image: this.card.image,
            name: this.card.name,
            type: this.card.type,
            color: this.card.color,
            text: this.card.text
        });
    };

    //API Requests
   $scope.getCardData = function() {
        mainService.getCardData($scope.card).then(function(data) {
            console.log('from the controller', data);
            $scope.cards = data;
        })
    };
});