/**
 * Created by luke on 8/18/15.
 */
var app = angular.module('mtg').controller('collectionCtrl', function($scope, mainService, $firebaseObject, $firebaseArray){

    // Firebase
    var ref = new Firebase("https://lukemtg.firebaseio.com/collection");
    var obj = $firebaseObject(ref);
    obj.$loaded()
        .then(function(data) {
            $scope.collectionData = data;
        })
        .catch(function(error) {
            console.error("Error:", error);
        });

    var deckRef = new Firebase("https://lukemtg.firebaseio.com/deck");

    var syncObject = $firebaseObject(deckRef);

    syncObject.$bindTo($scope, "addCard()");

    $scope.deck = $firebaseArray(deckRef);

    $scope.addCard = function() {
        $scope.deck.$add({
            image: this.val.image,
            name: this.val.name,
            type: this.val.type,
            color: this.val.color,
            text: this.val.text
        });
    };

    //TODO return firebase data as an array or crate custom filter to filter object.

});