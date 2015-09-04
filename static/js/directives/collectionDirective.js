/**
 * Created by luke on 8/20/15.
 */
var app = angular.module('mtg').directive('nglToggle', function() {
    return {
        templateUrl: 'templates/ngl-toggle.html',

        link: function(scope, elem, attr) {
            $(document).ready(function() {

                $('.image-popup-vertical-fit').magnificPopup({
                    type: 'image',
                    closeOnContentClick: true,
                    mainClass: 'mfp-img-mobile',
                    image: {
                        verticalFit: true
                    }
                });

                $('.image-popup-fit-width').magnificPopup({
                    type: 'image',
                    closeOnContentClick: true,
                    image: {
                        verticalFit: false
                    }
                });

                $('.image-popup-no-margins').magnificPopup({
                    type: 'image',
                    closeOnContentClick: true,
                    closeBtnInside: false,
                    fixedContentPos: true,
                    mainClass: 'mfp-no-margins mfp-with-zoom',
                    image: {
                        verticalFit: true
                    },
                    zoom: {
                        enabled: true,
                        duration: 300
                    }
                });
            });
        }
    }
});