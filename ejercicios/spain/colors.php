<? require(__DIR__.'/../../inc/head.php')?>
    <script src="http://d3js.org/d3.v3.min.js"></script>
    <script src="http://d3js.org/topojson.v1.min.js"></script>
    <script src="https://cdn.rawgit.com/rveciana/d3-composite-projections/0.0.3/composite-projections.min.js"></script>
    <div id="leyenda"></div>
    <div id="mapa"></div>
    <script>
        var width = 960,
            height = 550,
            centered;
        var colorCalibration = ['#f6faaa','#FEE08B','#FDAE61','#F46D43','#D53E4F','#9E0142'];
        var projection = d3.geo.conicConformalSpain().scale(2500).translate([width / 2, height / 2]);

        var path = d3.geo.path()
            .projection(projection);

        var svg = d3.select("#mapa").append("svg")
            .attr("width", width)
            .attr("height", height);

        var div = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);
        var g = svg.append("g");

        d3.select('#leyenda').append('svg')
            .selectAll('rect').data(colorCalibration).enter()
            .append('rect')
            .attr('width',20)
            .attr('height',20)
            .attr('x',function(d,i){
                return i*20;
            })
            .attr('fill',function(d){
                return d;
            });

        d3.json("/datos/provincias.json", function (error, provincias) {
            d3.json('/datos/poblacion.json',function(err,pob){

                var land = topojson.feature(provincias, provincias.objects.provincias);

                g.selectAll("path")
                    .data(land.features)
                    .enter()
                    .append("path")
                    .attr("class", "provincia")
                    .attr("d", path)
                    .style('fill',function(d,i,a){
                        var value = pob[d.properties.nombre];
                        var colorIndex = d3.scale.quantize()
                            .range([0,1,2,3,4,5])
                            .domain([0,100]);
                        return colorCalibration[colorIndex(value)];
                    })
                    .on("click", clicked);
                g.append("path")
                    .style("fill", "none")
                    .style("stroke", "#000")
                    .attr("d", projection.getCompositionBorders());
            });
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
            /*fill : gray;*/
        }
        #leyenda {
            height: 20px;
        }
        .provincia.active {
            /*fill : #FFA500 !important;*/
        }
    </style>
<? require(__DIR__.'/../../inc/footer.php')?>