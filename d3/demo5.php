<? require(__DIR__.'/../inc/head.php')?>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.5/d3.min.js"></script>
    <script>
        $(function () {
            var svg = d3.select("body")
                .append("svg")
                .attr("width", 500)
                .attr("height", 300)
                .style("background", "#DDD");

            var dataset = [5, 10, 15, 20, 25];

// fragmento de código en el que se generan los círculos que sean necesarios hasta llegar a los N elementos existentes en el dataset.

            var posx = 0;
            var circles = svg.selectAll("circle")
                .data(dataset) // parsea y recorre datos
                .enter()
                .append("circle");

            circles
                .style("fill", function (d) {
                    return "rgba(132, 0, 0, " + (d / 25) + ")";
                })
                .attr("cx", function (r, i) {
                    if (i === 0) posx = 0;
                    var margen = 10;
                    // la posición central del círculo será lo anterior + el radio
                    var p = posx + r;
                    // la nueva posición anterior p + la otra mitad del círculo + un margen
                    posx = (p + r + margen);
                    return p;
                })
                .attr("cy", 150)
                .attr("r", function (r) {
                    return r;
                });

            circles
                .attr("stroke", "orange")
                .attr("stroke-width", function (d) {
                    return d / 5;
                });
        });
    </script>
<? require(__DIR__.'/../inc/footer.php')?>