/**
 * Created by luke on 9/9/15.
 */
angular.module("mtg").directive('nglPie', function() {

    return {
        restrict: 'E',

        scope: {
            data: '=chartData'
        },

        link: function (scope, element, attrs) {

            var chartData = scope.data;
            var r = 150;

            var color = d3.scale.ordinal()
                .range(["red", "blue", "orange"]);

            var chart = d3.select(element[0]).append("svg")
                .attr("width", 400)
                .attr("height", 400);

            var group = chart.append("g")
                .attr("transform", "translate(175, 160)");

            var arc = d3.svg.arc()
                .innerRadius(115)
                .outerRadius(r);

            var pie = d3.layout.pie()
                .value(function(d) {
                    return d;
                });

            var arcs = group.selectAll(".arc")
                .data(pie(chartData))
                .enter()
                .append("g")
                .attr("class", "arc");


            arcs.append("path")
                .attr("d", arc)
                .attr("fill", function(data) {
                    return color(data.data);
                });

            arcs.append("text")
                .attr("transform", function(d) {
                    return "translate(" + arc.centroid(d) + ")";
                })
                .attr("text-anchor", "middle")
                .attr("font-size", "1.5em")
                .transition().ease("elastic")
                .text(function(d) {
                    return d.data;
                });

            legend = svg.append("g")
                .attr("class","legend")
                .attr("transform","translate(50,30)")
                .style("font-size","12px")
                .call(d3.legend)
        }
    };
});