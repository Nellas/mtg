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

            var chart = d3.select(element[0]);

            scope.render = function(data) {
                chart.selectAll('div').remove();
                chart.append("div").attr("class", "chart")
                    .selectAll('div')
                    .data(data).enter().append("div")
                    .transition().ease("elastic")
                    .style("width", function (d) {
                        console.log('this is d', d);
                        return d.value * 3 + "%";
                    })
                    .style("background-color", function (d) {
                        return d.color;
                    })
                    .text(function (d) {
                        return d.type + " " + d.value + "%";
                    });
            };

            scope.$watch('data', function() {
                scope.render(scope.data);
                console.log('render data', scope.data)
            }, true);
        }
    };
});
