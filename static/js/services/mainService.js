/**
 * Created by luke on 8/13/15.
 */

var app = angular.module('mtg').service('mainService', function($http, $q) {

    this.getCardData = function(card) {
        var dfd = $q.defer();
        if(!card){
            dfd.resolve('');
        } else {
            $http({
                method: 'GET',
                url: 'https://api.deckbrew.com/mtg/cards/typeahead?q=' + card
            }).then(function (data) {
                console.log(data);
                var returnedData = [];
                for (var i = 0; i < data.data.length; i++) {
                    returnedData.push({
                        name: data.data[i].name,
                        color: data.data[i].colors ? data.data[i].colors[0] : "no color",
                        text: data.data[i].text,
                        cost: data.data[i].cost,
                        type: data.data[i].types[0],
                        image: data.data[i].editions[0].image_url
                    });
                    //TODO set lands to proper color
                    //console.log('before function', returnedData.color);
                    //if (returnedData.color === 'no color' && returnedData.name === 'Plains') {
                    //        returnedData.color = 'White';
                    //    console.log('in function', returnedData);
                    //}
                }
                dfd.resolve(returnedData);
                console.log('after resolve', returnedData);
            });
        }
        return dfd.promise;
    }
});
