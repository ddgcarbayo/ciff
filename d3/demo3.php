<? require(__DIR__.'/../inc/head.php')?>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.5/d3.min.js"></script>
<style type="text/css">
    div.bar {
        display: inline-block;
        width: 20px;
        height: 75px;
        margin-right: 2px;
        background-color: teal;
    }

</style>
    <script>
        $(function () {
            var dataset = [];
            for (var i = 0; i < 25; i++) {
                var newNumber = Math.random() * 30;
                dataset.push(newNumber);
            }

            d3.select("body").selectAll("div")
                .data(dataset)
                .enter()
                .append("div")
                .attr("class", "bar")
                .style("height", function(d) {
                    var barHeight = d * 5;
                    return barHeight + "px";
                });

        });
    </script>
<? require(__DIR__.'/../inc/footer.php')?>