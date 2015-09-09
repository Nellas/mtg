/**
 * Created by luke on 8/13/15.
 */
var app = angular.module('mtg').service('mainService', function($http, $q) {

    function editResolve(data, dfd) {
        data.forEach(function(data) {
            switch(data.name) {
                case 'Plains':
                    data.color = 'white, colorless';
                    data.image = 'https://image.deckbrew.com/mtg/multiverseid/143620.jpg';
                    break;
                case 'Island':
                    data.color = 'blue, colorless';
                    data.image = 'https://image.deckbrew.com/mtg/multiverseid/143619.jpg';
                    break;
                case 'Mountain':
                    data.color = 'red, colorless';
                    data.image = 'https://image.deckbrew.com/mtg/multiverseid/25966.jpg';
                    break;
                case 'Swamp':
                    data.color = 'black, colorless';
                    data.image = 'https://image.deckbrew.com/mtg/multiverseid/276448.jpg';
                    break;
                case 'Forest':
                    data.color = 'green, colorless';
                    data.image= 'https://image.deckbrew.com/mtg/multiverseid/276468.jpg';
                    break;
            }
            switch (data.image) {
                case 'https://image.deckbrew.com/mtg/multiverseid/0.jpg':
            }

        });
        dfd.resolve(data);
    }

    function setColors(data) {
        console.log('DATA IN FUNCTION', data);
        if (!data.colors) {
            return "colorless";
        } else if (data.colors.length <= 1) {
            return data.colors[0];
        } else if (data.colors.length > 1) {
            return data.colors.join(', ');
        }
    }

    this.getCardData = function(card) {
        var dfd = $q.defer();
        if(!card){
            dfd.resolve('');
        } else {
            $http({
                method: 'GET',
                url: 'https://api.deckbrew.com/mtg/cards/typeahead?q=' + card
            }).then(function(data) {
                console.log('full object', data);
                var returnedData = [];
                data.data.forEach(function(data) {
                    returnedData.push({
                        name: data.name,
                        color: setColors(data),
                        //color: data.colors ? data.colors[0]: 'colorless',
                        type: data.types[0],
                        image: data.editions[0].image_url !== 'https://image.deckbrew.com/mtg/multiverseid/0.jpg' ? data.editions[0].image_url : data.editions[data.editions.length - 1].image_url
                    });

                });
                console.log('before edit', returnedData);
                editResolve(returnedData, dfd);
                console.log('after edit', returnedData);
            });
        }
        return dfd.promise;
    };
});