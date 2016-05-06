<? require(__DIR__.'/../inc/head.php');
?>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.2.10/angular.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.5/d3.min.js"></script>
    <div ng-app="GraficosApp">



        <barras width="500" height="100" pad="1" datos="[5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
11, 12, 15, 20, 18, 17, 16, 18, 23, 25];"></barras>




    </div>
    <script>
        angular.module('GraficosApp', []).run();

        angular.module('GraficosApp').directive('barras', function () {
            return {
                restrict: 'E',
                template : '<div id="gr"></div>',
                scope: {
                    datos: '=',
                    width: '@',
                    height: '@',
                    pad: '@'
                },
                link: function (scope, element, atts) {
                    var sortOrder = true;
                    var svg;
                    var w = scope.width;
                    var h = scope.height;
                    var barPadding = scope.pad;
                    var ordenabar = function () {
                        sortOrder = !sortOrder;
                        sortItems = function (a, b) {
                            if (sortOrder) {
                                return a - b;
                            }
                            return b - a;
                        };

                        svg.selectAll("rect")
                            .sort(sortItems)
                            .transition()
                            .delay(function (d, i) {
                                return i * 50;
                            })
                            .duration(1000)
                            .attr("x", function (d, i) {
                                return i * (w / scope.datos.length);
                            });

                        svg.selectAll('text')
                            .sort(sortItems)
                            .transition()
                            .delay(function (d, i) {
                                return i * 50;
                            })
                            .duration(1000)
                            .text(function (d) {
                                return d;
                            })
                            .attr("text-anchor", "middle")
                            .attr("x", function (d, i) {
                                return i * (w / scope.datos.length) + (w / scope.datos.length - barPadding) / 2;
                            })
                            .attr("y", function (d) {
                                return h - (d * 4) + 14;
                            });
                    };


                    //Create SVG element
                    var svg = d3.select('#gr')
                        .append("svg")
                        .attr("width", w)
                        .attr("height", h);

                    svg.selectAll("rect")
                        .data(scope.datos)
                        .enter()
                        .append("rect")
                        .attr("x", function (d, i) {
                            return i * (w / scope.datos.length);
                        })
                        .attr("y", function (d) {
                            return h - (d * 4);
                        })
                        .attr("fill", function (d) {
                            return "rgb(0, 0, " + (d * 10) + ")";
                        })
                        .on('click', function () {
                            ordenabar();
                        })
                        .transition()
                        .delay(function (d, i) {
                            return i * 20;
                        })
                        .duration(500)
                        .attr("width", w / scope.datos.length - barPadding)
                        .attr("height", function (d) {
                            return d * 4;
                        });


                    svg.selectAll("text")
                        .data(scope.datos)
                        .enter()
                        .append("text")
                        .text(function (d) {
                            return d;
                        })
                        .attr("text-anchor", "middle")
                        .attr("x", function (d, i) {
                            return i * (w / scope.datos.length) + (w / scope.datos.length - barPadding) / 2;
                        })
                        .attr("y", function (d) {
                            return h - (d * 4) + 14;
                        })
                        .attr("font-family", "sans-serif")
                        .attr("font-size", "11px")
                        .attr("fill", "white");

                }
            }
        });
    </script>
<? require(__DIR__.'/../inc/footer.php')?>