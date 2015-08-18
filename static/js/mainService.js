/**
 * Created by luke on 8/13/15.
 */
var app = angular.module('mtg').service('mainService', function($http, $q) {

    this.getCardData = function(card) {
        var dfd = $q.defer();
        $http({
            method: 'GET',
            url: 'https://api.deckbrew.com/mtg/cards/typeahead?q=' + card
        }).then(function(data) {
            console.log(data);
            var returnedData = [];
            for (var i = 0; i < data.data.length; i++) {
                returnedData.push({
                    name: data.data[i].name,
                    color: data.data[i].colors[0],
                    text: data.data[i].text
                })
            }
            dfd.resolve(returnedData);
        });
        return dfd.promise;
    }

});
