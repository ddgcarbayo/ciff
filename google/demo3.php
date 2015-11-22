<? require(__DIR__.'/../inc/head.php')?>
    <script type="text/javascript" src="https://www.google.com/jsapi"></script>
    <div id="chart" style="width: 800px; height: 400px;"></div>
<script>
    google.load("visualization", "1", {packages:["geochart"]});
    google.setOnLoadCallback(drawRegionsMap);

    function drawRegionsMap() {

        var data = google.visualization.arrayToDataTable([
            ['Country', 'Población'],
            ['Alemania', 200],
            ['Estados unidos', 300],
            ['Brasil', 400],
            ['Canada', 500],
            ['France', 600],
            ['Rusia', 700],
            ['España', 100]
        ]);

        var options = {
            backgroundColor: {
                'fill':'rgba(204, 204, 204, 0.77)'
            }
        };

        var container = document.getElementById('chart');
        var chart = new google.visualization.GeoChart(container);

        chart.draw(data, options);
    }
</script>
<? require(__DIR__.'/../inc/footer.php')?>