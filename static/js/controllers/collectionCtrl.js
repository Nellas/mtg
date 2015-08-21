/**
 * Created by luke on 8/18/15.
 */
var app = angular.module('mtg').controller('collectionCtrl', function($scope, mainService, $firebaseObject){

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
});