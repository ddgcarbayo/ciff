<? require(__DIR__.'/../inc/head.php')?>
    <script src="https://code.highcharts.com/stock/highstock.js"></script>
    <script src="https://code.highcharts.com/stock/modules/exporting.js"></script>
    <div id="containerg" style="height: 400px; min-width: 310px"></div>
<script>
    $(function () {
        $.getJSON('https://www.highcharts.com/samples/data/jsonp.php?filename=aapl-c.json&callback=?', function (data) {

            // Create the chart
            $('#containerg').highcharts('StockChart', {


                rangeSelector : {
                    selected : 1
                },

                title : {
                    text : 'AAPL Stock Price'
                },

                series : [{
                    name : 'AAPL Stock Price',
                    data : data,
                    type : 'area',
                    threshold : null,
                    tooltip : {
                        valueDecimals : 2
                    },
                    fillColor : {
                        linearGradient : {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops : [
                            [0, Highcharts.getOptions().colors[0]],
                            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                        ]
                    }
                }]
            });
        });
    });

</script>
<? require(__DIR__.'/../inc/footer.php')?>