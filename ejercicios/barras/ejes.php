<? require(__DIR__.'/../../inc/head.php')?>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.5/d3.min.js"></script>
    <script>
        var w = 500;
        var h = 500;
        var barPadding = 1;
        var margin = {top: 20, right: 20, bottom: 20, left: 40};
        var dataset = [5, 10, 13, 19, 21, 25, 22, 18, 15, 13, 11, 12, 15, 20, 18, 17, 16, 18, 23, 25];
        var domain = d3.max(dataset, function(d, i) { return d }); // 80
        var y = d3.scale.linear()
            .domain([0,domain]) // $0 to $80
            .range([h, 0]); // Descendente porque SVG es y-down (su 0,0 está en top left)

        var x = d3.scale.ordinal()
            .domain(dataset)
            .rangePoints([0, w]);

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient('bottom')
            .ticks(4);

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient('left')
            .tickFormat(d3.format(".2s"));


        //Create SVG element
        var svg = d3.select("body")
            .append("svg")
            .attr("width", w+margin.right+margin.left)
            .attr("height", h+margin.top+margin.bottom);
        var g = svg.append('g')            // create a <g> element
                .attr("transform", "translate("+margin.left+","+margin.top+")");

        g.selectAll("rect")
            .data(dataset)
            .enter()
            .append("rect")
            .attr("x", function (d, i) {
                return i * (w / dataset.length);
            })
            .attr("y", function (d) {
                return h - (d * 4);
            })
            .attr("fill", function (d) {
                return "rgb(0, 0, " + (d * 10) + ")";
            })
            .transition()
            .delay(function(d, i) {
                return i * 20;
            })
            .duration(500)
            .attr("width", w / dataset.length - barPadding)
            .attr("height", function (d) {
                return d * 4;
            });

        svg.append('g')            // create a <g> element
            .attr('class', 'x axis') // specify classes
            .attr("transform", "translate("+margin.left+","+(h+margin.top)+")")
            .call(xAxis);            // let the axis do its thing

        svg.append("g")
            .attr("class", "y axis")
            .attr("transform", "translate("+margin.left+","+margin.top+")")
            .call(yAxis);


        svg.selectAll("text")
            .data(dataset)
            .enter()
            .append("text")
            .text(function (d) {
                return d;
            })
            .attr("text-anchor", "middle")
            .attr("x", function (d, i) {
                return i * (w / dataset.length) + (w / dataset.length - barPadding) / 2;
            })
            .attr("y", function (d) {
                return h - (d * 4) + 14;
            })
            .attr("font-family", "sans-serif")
            .attr("font-size", "11px")
            .attr("fill", "white");
    </script>
    <style type="text/css">
        svg {margin: 20px; }
    </style>
<? require(__DIR__.'/../../inc/footer.php')?>