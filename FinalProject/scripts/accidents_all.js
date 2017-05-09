
var year      = [2013, 2014, 2015, 2016];
var accidents = [203715, 205960, 217636, 227658];

var marginn = {top: 40, right: 50, bottom: 100, left: 100},
	ww          = 500 - marginn.left - marginn.right,
	hh          = 400 - marginn.top - marginn.bottom;

/* Variables needed in script */
var maxAccidents = d3.max(accidents);

/* Setting script values for bar chart */
var xScale_small = d3.scale.ordinal()
				.domain(year)
				.rangeRoundBands([0, ww], 0.05);

var yScale_small = d3.scale.linear()
				.domain([0, maxAccidents])
				.range([hh, 0]);

//Define X axis
var xAxis = d3.svg.axis()
			  .scale(xScale_small)
			  .orient("bottom");

//Define Y axis
var yAxis = d3.svg.axis()
			  .scale(yScale_small)
			  .orient("left");

// Define the div for the tooltip
var div = d3.select("rect")	
    .attr("a", "data-tooltip");

//Create SVG element
var svg = d3.select("#accidents_all")
			.append("svg")
			.attr("width", ww + marginn.left + marginn.right)
			.attr("height", hh + marginn.top + marginn.bottom)
			.append("g")
			.attr("transform",
				  "translate(" + marginn.left + "," + marginn.top + ")");

//Create bars
svg.selectAll("rect")
   .data(year)
   .enter()
   .append("rect")
   .attr("x", function(d, i) {
   		return xScale_small(d);
   })
   .attr("width", xScale_small.rangeBand())
   .attr("fill", "darkblue");

// Set bar height
svg.selectAll("rect")
 	.data(accidents)
 	.attr("y", function(d) {
   		return yScale_small(d);
   })
   .attr("height", function(d) {
   		return hh - yScale_small(d); /* number of accidents */
   })

   .on("mouseover", function(d) {
		//Create the tooltip label
		d3.select(this)
			.attr("fill", "orange")
		svg.append("text")
		   .attr("id", "tooltip")
		   .attr("x", hh/2.3)
		   .attr("y", ww-30)
		   .attr("font-family", "sans-serif")
		   .attr("font-size", "12px")
		   .attr("font-weight", "bold")
		   .attr("fill", "black")
		   .attr("background", "rgba(255,255,255,0.5)")
		   .text("No of accidents: " + d3.format(",.0")(d));
   })
   .on("mouseout", function(d) {
   		d3.select(this)
    		.attr("fill", "darkblue");
		//Remove the tooltip
		d3.select("#tooltip").remove();
	})

//Create X axis
svg.append("g")
	.attr("class", "x axis")
	.attr("transform", "translate(0," + hh + ")")
	.call(xAxis)
	.selectAll("text")
	.style("text-anchor", "end")
		.attr("dx", "-1.0em")
		.attr("dy", "-.55em")
		.attr("font-size", "12px")
		.attr("transform", "rotate(-45)" ); /* Setting x axis position, vertical */

//Create Y axis
svg.append("g")
	.attr("class", "y axis")
	.call(yAxis);

// Add plot title
svg.append("text")
	.attr("class", "xy axis")
	.attr("transform", "translate("+ (ww / 5) +","+ (marginn.left-110) +")")
	.text("Accidents per year")
	.style("font-size", "20px");

