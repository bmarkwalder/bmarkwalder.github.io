var BarViz = function () {
    var newBC = {

        bar_cord: function (svg, data) {

            svg.selectAll("g").remove();
            var margin = {top: 20, right: 20, bottom: 30, left: 40},
                width = +svg.attr("width") - margin.left - margin.right,
                height = +svg.attr("height") - margin.top - margin.bottom;

            var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
                y = d3.scaleLinear().rangeRound([height, 0]);

            var g = svg.append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            x.domain(data.map(function(d) { return d.id; }));
            y.domain([0, d3.max(data, function(d) { return d.value; })]);

            g.append("g")
                .attr("class", "axis axis--x")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x).tickFormat(""));


            g.append("g")
                .attr("class", "axis axis--y")
                .call(d3.axisLeft(y).ticks(10))
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", "0.71em")
                .attr("text-anchor", "end")
                .text("value");

            g.selectAll(".bar")
                .data(data)
                .enter().append("rect")
                .attr("class", "bar")
                .attr("x", function(d) { return x(d.id); })
                .attr("y", function(d) { return y(d.value); })
                .attr("width", x.bandwidth())
                .attr("height", function(d) { return height - y(d.value);
                })
                .on("mouseover", function (d) {
                    var xPos = parseFloat(d3.select(this).attr("x")) + x.bandwidth() / 2;
                    var yPos = parseFloat(d3.select(this).attr("y")) + 10;

                    svg.append("text")
                        .attr("id", "tooltip")
                        .attr("x", xPos)
                        .attr("y", yPos)
                        .attr("fill", "slategrey")
                        .text(d.id);

                })
                .on("mouseout", function() {
                    d3.select("#tooltip").remove();

                });
        }
    };
    return newBC;
};

