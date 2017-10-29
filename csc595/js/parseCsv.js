var parseCsv = function (dataIn) {

    var data = d3.csvParse(dataIn,
        function(d) {
            d.size = +d.size;
            return d;
        });
    return data;
};