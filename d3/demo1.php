<? require(__DIR__.'/../inc/head.php')?>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.5/d3.min.js"></script>
<style type="text/css">
    .axis path,
    .axis line {
        fill: none;
        stroke: #000;
        shape-rendering: crispEdges;
    }

    .line {
        fill: none;
        stroke: steelblue;
        stroke-width: 3pt;
    }

</style>
    <script>
        $(function () {
            var margin = {top: 20, right: 20, bottom: 30, left: 40},
                width = 960 - margin.left - margin.right,
                height = 500 - margin.top - margin.bottom;
            var data = [
                { date: '2014-01-01', amount: 10 },
                { date: '2014-02-01', amount: 20 },
                { date: '2014-03-01', amount: 40 },
                { date: '2014-04-01', amount: 80 }
            ];

            var domain = d3.max(data, function(d, i) { return d.amount }); // 80
            var y = d3.scale.linear()
                .domain([0,domain]) // $0 to $80
                .range([200, 0]); // Descendente porque SVG es y-down (su 0,0 está en top left)

            var x = d3.time.scale()
                .domain([
                    new Date(Date.parse('2014-01-01')),
                    new Date(Date.parse('2014-04-01'))
                ])
                .range([0, 300]);

            var xAxis = d3.svg.axis()
                .scale(x)
                .orient('bottom')
                .ticks(4);

            var yAxis = d3.svg.axis()
                .scale(y)
                .orient('left')
                .tickFormat(d3.format(".2s"));

            var svg = d3.select("body").append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

            svg.append('g')            // create a <g> element
                .attr('class', 'x axis') // specify classes
                .attr("transform", "translate(0,200)")
                .call(xAxis);            // let the axis do its thing

            svg.append("g")
                .attr("class", "y axis")
                .call(yAxis);

            var line = d3.svg.line()
                .x(function(d) { return x(new Date(Date.parse(d.date))) })
                .y(function(d) { return y(d.amount) })

            svg.append("path")
                .datum(data)
                .attr("class", "line")
                .attr("d", line);

        });
    </script>
<? require(__DIR__.'/../inc/footer.php')?>