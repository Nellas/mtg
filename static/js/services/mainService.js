/**
 * Created by luke on 8/13/15.
 */

var app = angular.module('mtg').service('mainService', function($http, $q) {

    function editResolve(data, dfd) {
        for (var i = 0; i < data.length; i++) {
            switch(data[i].name) {
                case 'Plains':
                    data[i].image = 'https://image.deckbrew.com/mtg/multiverseid/143620.jpg';
                    data[i].color = 'white';
                    break;
                case 'Island':
                    data[i].image = 'https://image.deckbrew.com/mtg/multiverseid/143619.jpg';
                    data[i].color = 'blue';
                    break;
                case 'Mountain':
                    data[i].image = 'https://image.deckbrew.com/mtg/multiverseid/25966.jpg';
                    data[i].color = 'red';
                    break;
                case 'Swamp':
                    data[i].image = 'https://image.deckbrew.com/mtg/multiverseid/276448.jpg';
                    data[i].color = 'black';
                    break;
                case 'Forest':
                    data[i].image= 'https://image.deckbrew.com/mtg/multiverseid/276468.jpg';
                    data[i].color = 'green';
                    break;
            }
        }
        dfd.resolve(data);
    }

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
                data.data.forEach(function(data) {
                    returnedData.push({
                        name: data.name,
                        color: data.colors ? data.colors[0] : 'no color',
                        text: data.text,
                        cost: data.cost,
                        type: data.types[0],
                        image: data.editions[0].image_url
                    });

                });
                editResolve(returnedData, dfd);
            });
        }
        return dfd.promise;
    }
});
