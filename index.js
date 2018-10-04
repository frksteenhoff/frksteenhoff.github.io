// set the dimensions and margins of the graph
var margin = {top: 20, right: 20, bottom: 40, left: 50},
    width = 800 - margin.left - margin.right,
    height = 250 - margin.top - margin.bottom,
    max_bgl_value = 21,
    kidsAge = 10,
    high_threshold = 10,
    low_threshold = 6;

if (kidsAge > 12) {
    high_threshold = 12;
    low_threshold = 8;
} else {
    high_threshold = 10;
    low_threshold = 6;
}
console.log("kids age: " + kidsAge + "\n" + "thres_low: " + low_threshold + "\n" + "thres_high: " + high_threshold);

// parse the date / time
var parseDate = d3.timeParse("%Y-%m-%d %H:%M:%S");
// %e space padded day of month
// %B full month name
var formatTime = d3.timeFormat("%a");
console.log(parseDate("2017-09-11 18:35:10"))

// set the ranges
var x = d3.scaleTime().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);

// define the div for the tooltip
var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

var calculated_bgl_line = d3.line()
    .x( function(d) { return x(d.timestamp); })
    .y( function(d) { return y(d.calculated_bgl); });

var high_threshold_line = d3.line()
    .x(function(d){ return x(d.timestamp); })
    .y(function(d){ return y(high_threshold); });

var low_threshold_line = d3.line()
    .x(function(d){ return x(d.timestamp); })
    .y(function(d){ return y(low_threshold); })

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");


function draw(data, tempdata) {

    var data = data[tempdata];

    data.forEach(function(d, i) {

        d.timestamp = parseDate(d.timestamp);
        d.calculated_bgl = +d.calculated_bgl;
    });

    console.log(data);

    data.sort(function(a, b){
        return a["timestamp"]-b["timestamp"];
    });

    // scale the range of data
    x.domain(d3.extent(data, function(d){
        return d.timestamp;
    }));
    
    y.domain([0, d3.max(data, function(d){
        return Math.max(d.calculated_bgl, max_bgl_value);
    })]);

    // Add the calculated_bgl path.
    svg.append("path")
        .data([data])
        .attr("class", "line temp-probe temperature")
        .attr("d", calculated_bgl_line);

    svg.append("path")
        .data([data])
        .attr("class", "line high-threshold")
        .attr("d", high_threshold_line)

    svg.append("path")
        .data([data])
        .attr("class", "line low-threshold")
        .attr("d", low_threshold_line)


    // add the X Axis
    svg.append("g")
        .attr("transform", "translate(0,"+ height + ")")
        .call(d3.axisBottom(x));

    // text label for the x axis
      svg.append("text")             
          .attr("transform",
                "translate(" + (width/2) + " ," + 
                               (height + margin.top + 10) + ")")
          .style("text-anchor", "right")
          .text("Time of day");

    // add the Y Axis
    svg.append("g")
        .call(d3.axisLeft(y));
     
    // text label for the y axis
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1.75em")
        .style("text-anchor", "top")
        .text("Glucose level (mmol/L)  "); 
}

d3.json("temp_data.json",
        function(error, data){
    if (error){
        console.log("an error has occurred in d3 JSON");
        throw error;
    }
    draw(data[0], "tempdata");
});