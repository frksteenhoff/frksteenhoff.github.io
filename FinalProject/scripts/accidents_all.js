
var year_      = [2013, 2014, 2015, 2016];
var accidents_ = [203715, 205960, 217636, 227658];

var marginn = {top: 40, right: 50, bottom: 100, left: 100},
	ww          = 500 - marginn.left - marginn.right,
	hh          = 400 - marginn.top - marginn.bottom;

/* Variables needed in script */
var maxAccidents_ = d3.max(accidents_);

/* Setting script values for bar chart */
var xScale_small2 = d3.scale.ordinal()
				.domain(year_)
				.rangeRoundBands([0, ww], 0.05);

var yScale_small2 = d3.scale.linear()
				.domain([0, maxAccidents_])
				.range([hh, 0]);

//Define X axis
var x_Axis = d3.svg.axis()
			  .scale(xScale_small2)
			  .orient("bottom");

//Define Y axis
var y_Axis = d3.svg.axis()
			  .scale(yScale_small2)
			  .orient("left");

// Define the div for the tooltip
var div = d3.select("rect")	
    .attr("a", "data-tooltip");

//Create SVG element
var svg = d3.select("#deaths_all")
			.append("svg")
			.attr("width", ww + marginn.left + marginn.right)
			.attr("height", hh + marginn.top + marginn.bottom)
			.attr("float", "right")
			.append("g")
			.attr("transform",
				  "translate(" + marginn.left + "," + marginn.top + ")");

//Create bars
svg.selectAll("rect")
   .data(year_)
   .enter()
   .append("rect")
   .attr("x", function(d, i) {
   		return xScale_small2(d);
   })
   .attr("width", xScale_small2.rangeBand())
   .attr("fill", "darkblue")
   .on("mouseover", function(d) {
		d3.select(this)
			.attr("fill", "orange")
   })
   .on("mouseout", function(d) {
   		d3.select(this)
    		.attr("fill", "darkblue");
	})

// Set bar height
svg.selectAll("rect")
 	.data(accidents_)
 	.attr("y", function(d) {
   		return yScale_small2(d);
   })
   .attr("height", function(d) {
   		return hh - yScale_small2(d); /* number of accidents */
   })
   .append("title")
   .text(function(d){
   		return "Number of accidents: " + d3.format(",.0")(d);
   })

//Create X axis
svg.append("g")
	.attr("class", "x axis")
	.attr("transform", "translate(0," + hh + ")")
	.call(x_Axis)
	.selectAll("text")
	.style("text-anchor", "end")
		.attr("dx", "-1.0em")
		.attr("dy", "-.55em")
		.attr("font-size", "12px")
		.attr("transform", "rotate(-45)" ); /* Setting x axis position, vertical */

//Create Y axis
svg.append("g")
	.attr("class", "y axis")
	.call(y_Axis);

// Add plot title
svg.append("text")
	.attr("class", "xy axis")
	.attr("transform", "translate("+ (ww / 5) +","+ (marginn.left-110) +")")
	.text("Accidents per year")
	.style("font-size", "20px");
