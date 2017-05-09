
var year      = [2013, 2014, 2015, 2016];
var accidents = [11+176+110, 20+133+109, 15+133+95, 22+146+73];

var margin2 = {top: 40, right: 50, bottom: 100, left: 100},
	w2          = 500 - margin2.left - margin2.right,
	h2          = 400 - margin2.top - margin2.bottom;

/* Variables needed in script */
var maxAcc = d3.max(accidents);

/* Setting script values for bar chart */
var xScale_small = d3.scale.ordinal()
				.domain(year)
				.rangeRoundBands([0, w2], 0.05);

var yScale_small = d3.scale.linear()
				.domain([0, maxAcc])
				.range([h2, 0]);

//Define X axis
var xAxis_ = d3.svg.axis()
			  .scale(xScale_small)
			  .orient("bottom");

//Define Y axis
var yAxis_ = d3.svg.axis()
			  .scale(yScale_small)
			  .orient("left");

// Define the div for the tooltip
var div = d3.select("rect")	
    .attr("a", "data-tooltip");

//Create SVG element
var svg = d3.select("#deaths_all")
			.append("svg")
			.attr("width", w2 + margin2.left + margin2.right)
			.attr("height", h2 + margin2.top + margin2.bottom)
			.attr("float", "left")
			.append("g")
			.attr("transform",
				  "translate(" + margin2.left + "," + margin2.top + ")");

//Create bars
svg.selectAll("rect")
   .data(year)
   .enter()
   .append("rect")
   .attr("x", function(d, i) {
   		return xScale_small(d);
   })
   .attr("width", xScale_small.rangeBand())
   .attr("fill", "darkred")
   .on("mouseover", function(d) {
		d3.select(this)
			.attr("fill", "orange")
   })
   .on("mouseout", function(d) {
   		d3.select(this)
    		.attr("fill", "darkred");
	});

// Set bar height
svg.selectAll("rect")
 	.data(accidents)
 	.attr("y", function(d) {
   		return yScale_small(d);
   })
   .attr("height", function(d) {
   		return h2 - yScale_small(d); /* number of accidents */
   })
   .append("title")
   .text(function(d) {
   		return "Number of fatalities: " + d3.format(",.0")(d);
   	});


//Create X axis
svg.append("g")
	.attr("class", "x axis")
	.attr("transform", "translate(0," + h2 + ")")
	.call(xAxis_)
	.selectAll("text")
	.style("text-anchor", "end")
		.attr("dx", "-1.0em")
		.attr("dy", "-.55em")
		.attr("font-size", "12px")
		.attr("transform", "rotate(-45)" ); /* Setting x axis position, vertical */

//Create Y axis
svg.append("g")
	.attr("class", "y axis")
	.call(yAxis_);

// Add plot title
svg.append("text")
	.attr("class", "xy axis")
	.attr("transform", "translate("+ (w2 / 5) +","+ (margin2.left-110) +")")
	.text("Fatalities per year")
	.style("font-size", "20px");

