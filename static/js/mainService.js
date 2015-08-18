/**
 * Created by luke on 8/13/15.
 */
var app = angular.module('mtg').service('mainService', function($http, $q) {

    this.getCardData = function() {
        var dfd = $q.defer();
        $http({
            method: 'GET',
            url: 'https://api.deckbrew.com/mtg/cards/divine-verdict'
        }).then(function(data) {
            console.log(data);
            var returnedData = {
                name: data.data.name,
                color: data.data.colors[0],
                image: data.data.editions[3].image_url,
                type: data.data.types[0]


            };
            dfd.resolve(returnedData);
        });
        return dfd.promise;
    }

});
