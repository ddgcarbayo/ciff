<? require(__DIR__.'/../../inc/head.php')?>
    <script src="http://d3js.org/d3.v3.min.js"></script>
    <script src="http://d3js.org/topojson.v1.min.js"></script>
    <script src="https://cdn.rawgit.com/rveciana/d3-composite-projections/0.0.3/composite-projections.min.js"></script>
    <script>
        var width = 960,
            height = 550,
            centered;

        var projection = d3.geo.conicConformalSpain().scale(2500).translate([width / 2, height / 2]);

        var path = d3.geo.path()
            .projection(projection);

        var svg = d3.select("body").append("svg")
            .attr("width", width)
            .attr("height", height);

        var div = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);
        var g = svg.append("g");

        d3.json("/datos/provincias.json", function (error, provincias) {
                var land = topojson.feature(provincias, provincias.objects.provincias);
                g.selectAll("path")
                    .data(land.features)
                    .enter()
                    .append("path")
                    .attr("class", "provincia")
                    .attr("d", path)
                    .on("click", clicked);
                g.append("path")
                    .style("fill", "none")
                    .style("stroke", "#000")
                    .attr("d", projection.getCompositionBorders());
        });

        function clicked(d) {
            var x, y, k;

            if (d && centered !== d) {
                var centroid = path.centroid(d);
                x = centroid[0];
                y = centroid[1];
                k = 4;
                centered = d;
            } else {
                x = width / 2;
                y = height / 2;
                k = 1;
                centered = null;
            }

            g.selectAll("path")
                .classed("active", centered && function(d) { return d === centered; });

            g.transition()
                .duration(750)
                .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
                .style("stroke-width", 1.5 / k + "px");
        }
    </script>
    <style type="text/css">
        .provincia {
            fill : gray;
        }
        .provincia.active {
            fill : #FFA500 !important;
        }
    </style>
<? require(__DIR__.'/../../inc/footer.php')?>