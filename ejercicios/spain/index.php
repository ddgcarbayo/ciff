<? require(__DIR__.'/../../inc/head.php')?>
    <script src="http://d3js.org/d3.v3.min.js"></script>
    <script src="http://d3js.org/topojson.v1.min.js"></script>
    <script src="https://cdn.rawgit.com/rveciana/d3-composite-projections/0.0.3/composite-projections.min.js"></script>
    <script>
        var width = 960,
            height = 550,
            centered;

        var projection = d3.geo.conicConformalSpain().scale(3000).translate([width / 2, height / 2]);

        var path = d3.geo.path()
            .projection(projection);

        var svg = d3.select("body").append("svg")
            .attr("width", width)
            .attr("height", height);

        var div = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);
        var g = svg.append("g"); // elemento que agrupa todos las provincias...interesante para hacer zoom

        d3.json("/datos/provincias.json", function (error, provincias) {
                var land = topojson.feature(provincias, provincias.objects.provincias);
                g.selectAll("path")
                    .data(land.features)
                    .enter()
                    .append("path")
                    .attr("class", "provincia")
                    .attr("d", path);
                g.append("path")
                    .style("fill", "none")
                    .style("stroke", "#000")
                    .attr("d", projection.getCompositionBorders());
        });

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