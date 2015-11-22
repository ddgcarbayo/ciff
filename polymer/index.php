<? require(__DIR__.'/../inc/head.php');
?>
    <script src="http://cdnjs.cloudflare.com/ajax/libs/polymer/0.5.0/polymer.js"></script>
    <script src="http://d3js.org/d3.v3.min.js"></script>
    <link rel="import" href="/polymer/pie-chart.html">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
    <div class="template">
        <pie-chart url="/polymer/data.csv"></pie-chart>
    </div>
<? require(__DIR__.'/../inc/footer.php')?>