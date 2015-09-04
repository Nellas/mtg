/**
 * Created by luke on 9/2/15.
 */
angular.module("mtg").directive('nglChart', function() {

    return {
        restrict: 'E',

        replace: false,

        scope: {
            data: '=chartData'
        },

        link: function (scope, element, attrs) {

            setTimeout(function() {
                var chart = d3.select(element[0]);

                chart.append("div").attr("class", "chart")
                    .selectAll('div')
                    .data(scope.data).enter().append("div")
                    .transition().ease("elastic")
                    .style("width", function(d) { return d.value + "%"; })
                    .style("background-color", function(d) { return d.color; })
                    .text(function(d) { return d.type + " " + d.value + "%"; });

                scope.$watch(scope.data, function(newVals, oldVals) {
                    return chart.data(newVals).enter().append("div")
                }, true);

            }, 400);
        }
    };
});
