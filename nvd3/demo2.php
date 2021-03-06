<? require(__DIR__.'/../inc/head.php')?>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/nvd3/1.8.1/nv.d3.min.css">
<style type="text/css">
    #chart svg { height:  500px; }
</style>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.9/d3.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/nvd3/1.8.1/nv.d3.min.js"></script>

    <div id="chart">
        <svg></svg>
    </div>

<script>
    $(function () {
        d3.tsv("/datos/apple.tsv", function (error, arr) {
            var serie = {
                values: [],
                key: 'Apple',
                color: '#2ca02c'
            };
            var parseDate = d3.time.format("%d-%b-%y").parse;
            arr.forEach(function (el) {
                serie.values.push({
                    x: new Date(parseDate(el.date)),
                    y: parseFloat(el.close)
                });
            });
            var data = [serie];
            nv.addGraph(function () {
                var chart = nv.models.lineChart()
                    ;

                chart.xAxis
                    .axisLabel('Time')
                    .tickFormat(function (d) {
                        return d3.time.format('%d-%m-%Y')(new Date(d));
                    })
                ;

                chart.yAxis
                    .axisLabel('Price($)')
                    .tickFormat(d3.format('.02f'))
                ;

                d3.select('#chart svg')
                    .datum(data)
                    .transition().duration(500)
                    .call(chart);

                nv.utils.windowResize(chart.update);

                return chart;
            });
        });
    });
</script>
<? require(__DIR__.'/../inc/footer.php')?>