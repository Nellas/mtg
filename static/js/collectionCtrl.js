/**
 * Created by luke on 8/18/15.
 */
var app = angular.module('mtg').controller('collectionCtrl', function($scope, mainService){






    // jQuery
    $(document).ready(function() {

        $('.collection-card-info').hide();

        $('.collection-content').click(function() {
            $('.collection-card-info', this).slideToggle('fast');
        });

    });


});