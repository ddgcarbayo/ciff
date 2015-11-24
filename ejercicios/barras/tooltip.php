<? require(__DIR__.'/../../inc/head.php')?>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.5/d3.min.js"></script>
    <script>
        var w = 500;
        var h = 100;
        var sortOrder=true;
        var barPadding = 1;
        var svg;
        var tooltip;
        var dataset;
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
        d3.json('/datos/barras.json',function(err,data){
            dataset = data;
            svg = d3.select("body")
                .append("svg")
                .attr("width", w)
                .attr("height", h);
            tooltip = d3.select("body").append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);

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
                .on("mouseover", function (d) {
                    tooltip.transition()
                        .duration(200)
                        .style("opacity", 0.9);
                    tooltip
                        .html("Resultado: "+d)
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY - 28) + "px");
                })
                .on("mouseout", function (d) {
                    tooltip.transition()
                        .duration(500)
                        .style("opacity", 0);
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
        });
    </script>
<style type="text/css">
    svg {margin: 20px; }
    div.tooltip {
        position: absolute;
        text-align: center;
        width: 70px;
        color: lightgoldenrodyellow;
        padding: 2px;
        font: 12px sans-serif;
        background: indianred;
        border: 0px;
        border-radius: 8px;
        pointer-events: none;
    }
</style>
<? require(__DIR__.'/../../inc/footer.php')?>