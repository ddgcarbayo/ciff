<? require(__DIR__.'/../inc/head.php')?>
    <script src="http://d3js.org/d3.v3.min.js"></script>
    <script src="http://d3js.org/topojson.v1.min.js"></script>
    <script src="https://cdn.rawgit.com/rveciana/d3-composite-projections/0.0.3/composite-projections.min.js"></script>
    <script>
        var width = 960,
            height = 550;
        var colores = {
            "PP": "#03a9e7",
            "PSOE": "#ff2f2e",
            "IU": "#149f27",
            "UPyD": "#d64b8c",
            "CiU": "#024c97",
            "Amaiur": "#b0d2e9",
            "PNV": "#0f7c2f",
            "ERC": "#f9d43f",
            "Compromís": "#faddaa",
            "Podemos": "#82398a",
            "Ciudadanos": "#e28535",
            "Otros": "#e8e8e8"
        };

        var projection = d3.geo.conicConformalSpain()

        var path = d3.geo.path()
            .projection(projection);

        var svg = d3.select("body").append("svg")
            .attr("width", width)
            .attr("height", height);

        var div = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

        d3.json("/datos/provincias.json", function (error, provincias) {
            d3.json("/datos/resultados.json", function (error, resultados) {
                resultados=resultados[0];
                console.log(resultados);
                var land = topojson.feature(provincias, provincias.objects.provincias);
                svg.selectAll("path")
                    .data(land.features)
                    .enter()
                    .append("path")
                    .attr("d", path)
                    .attr("fill", function (d) {
                        try{
                            var ganador = Object.keys(resultados[d.properties.nombre])[0];
                            return colores[ganador];
                        }catch(e){
                            return '';
                        }
                    })
                    .on("mouseover", function (d) {
                        d3.select(this)
                            .transition()
                            .style("stroke-width", 4);

                        div.transition()
                            .duration(200)
                            .style("opacity", 0.9);
                        var resultados_provincia = "";
                        var partido;
                        for (partido in resultados[d.properties.nombre]) {
                            resultados_provincia += partido + ": " + resultados[d.properties.nombre][partido] + "</br>";
                        }
                        div.html("Resultados: <br/>" + resultados_provincia)
                            .style("left", (d3.event.pageX) + "px")
                            .style("top", (d3.event.pageY - 28) + "px");
                    })
                    .on("mouseout", function (d) {
                        d3.select(this)
                            .transition()
                            .style("stroke-width", 0);
                        div.transition()
                            .duration(500)
                            .style("opacity", 0);
                    });

                svg.append("path")
                    .style("fill", "none")
                    .style("stroke", "#000")
                    .attr("d", projection.getCompositionBorders());
            });
        });
    </script>
    <style type="text/css">
        div.tooltip {
            position: absolute;
            text-align: center;
            width: 70px;
            padding: 2px;
            font: 12px sans-serif;
            background: lightsteelblue;
            border: 0px;
            border-radius: 8px;
            pointer-events: none;
        }
    </style>
<? require(__DIR__.'/../inc/footer.php')?>