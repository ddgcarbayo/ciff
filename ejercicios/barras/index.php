<? require(__DIR__.'/../../inc/head.php')?>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.5/d3.min.js"></script>
    <script>
        var w = 500;
        var h = 100;
        var barPadding = 1;

        var dataset = [5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
            11, 12, 15, 20, 18, 17, 16, 18, 23, 25];

        var sortOrder=true;
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
                    return i * (w / dataset.length);
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
                    return i * (w / dataset.length) + (w / dataset.length - barPadding) / 2;
                })
                .attr("y", function (d) {
                    return h - (d * 4) + 14;
                });
        };


        //Create SVG element
        var svg = d3.select("body")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

        svg.selectAll("rect")
            .data(dataset)
            .enter()
            .append("rect")
            .attr("x", function (d, i) {
                return i * (w / dataset.length);
            })
            .attr("y", function (d) {
                return h - (d * 4);
            })
            .attr("fill", function (d) {
                return "rgb(0, 0, " + (d * 10) + ")";
            })
            .on('click',function(){ ordenabar(); })
            .transition()
            .delay(function(d, i) {
                return i * 20;
            })
            .duration(500)
            .attr("width", w / dataset.length - barPadding)
            .attr("height", function (d) {
                return d * 4;
            });


        svg.selectAll("text")
            .data(dataset)
            .enter()
            .append("text")
            .text(function (d) {
                return d;
            })
            .attr("text-anchor", "middle")
            .attr("x", function (d, i) {
                return i * (w / dataset.length) + (w / dataset.length - barPadding) / 2;
            })
            .attr("y", function (d) {
                return h - (d * 4) + 14;
            })
            .attr("font-family", "sans-serif")
            .attr("font-size", "11px")
            .attr("fill", "white");
    </script>
    <style type="text/css">
        svg {margin: 20px; }
    </style>
<? require(__DIR__.'/../../inc/footer.php')?>