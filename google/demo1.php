<? require(__DIR__.'/../inc/head.php')?>
    <script type="text/javascript" src="https://www.google.com/jsapi?autoload={'modules':[{'name':'visualization','version':'1.1','packages':['geochart']}]}"></script>
    <div id="regions_div" style="width: 900px; height: 500px;"></div>
<script>
    google.setOnLoadCallback(drawRegionsMap);

    function drawRegionsMap() {

        var data = google.visualization.arrayToDataTable([
            ['Country', 'Popularity'],
            ['Germany', 200],
            ['United States', 300],
            ['Brazil', 400],
            ['Canada', 500],
            ['France', 600],
            ['RU', 700]
        ]);

        var options = {};

        var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

        chart.draw(data, options);
    }
</script>
<? require(__DIR__.'/../inc/footer.php')?>