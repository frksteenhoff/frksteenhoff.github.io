// ------------------------------------------------------------------------ //
// Global variables
// ------------------------------------------------------------------------ //
var max_     = 0,  // all time max num of accidents
    borough  = ["BRONX", "BROOKLYN", "MANHATTAN", "QUEENS", "STATEN ISLAND"],
    colors   = ["darkgreen", "red", "darkorange", "blue", "purple"];  
    /* Margin and padding */
    margin_  = {top: 40, right: 50, bottom: 100, left: 100},
    w1       = 1000 - margin_.left - margin_.right,
    h1       = 600 - margin_.top - margin_.bottom;
var bar_dataset;  // Initializing dataset
var numOfHours, hourOfDay, accPerHour, 
    index    = 0,
    currentBorough = borough[index];

// ------------------------------------------------------------------------ //
// Reading in json shapefile - accidents per year per borough
// ------------------------------------------------------------------------ //
d3.json("data/hour_data.json", function(data) {
	bar_dataset = data;

	/* Find largest values within all boroughs */
	for (var i = 0; i < borough.length; i++) {
		max_y = d3.max(Object.values(bar_dataset[borough[i]]));
		if(max_y > max_) {
			max_ = max_y;
		}
	}
	/* Variables needed in subsequent part of script */
	numOfHours = Object.keys(bar_dataset[currentBorough]).length;
	hourOfDay  = Object.keys(bar_dataset[currentBorough]);
	accPerHour = Object.values(bar_dataset[currentBorough]);

/* Setting script values for bar chart */
var xScale_bar = d3.scale.ordinal()
				.domain(hourOfDay)
				.rangeRoundBands([0, w1], 0.05);

var yScale_bar = d3.scale.linear()
				.domain([0, max_])
				.range([h1, 0]);

//Define X axis
var xAxis_bar  = d3.svg.axis()
			  .scale(xScale_bar)
			  .orient("bottom")
			  .ticks(10);

//Define Y axis
var yAxis_bar  = d3.svg.axis()
			  .scale(yScale_bar)
			  .orient("left")
			  .ticks(10);

//Create SVG element
var svg = d3.select("#acc_all")
			.append("svg")
			.attr("width", w1 + margin_.left + margin_.right)
			.attr("height", h1 + margin_.top + margin_.bottom)
			.append("g")
			.attr("transform",
				  "translate(" + margin_.left + "," + margin_.top + ")");

//Create bars
svg.selectAll("rect")
   .data(hourOfDay)
   .enter()
   .append("rect")
   .attr("x", function(d, i) {
   		return xScale_bar(d);
   })
   .attr("width", xScale_bar.rangeBand())
   .attr("fill", colors[index])
	.on("mouseover", function() {
    	d3.select(this)
    		.attr("fill", "orange");
	})
	.on("mouseout", function(d, i) {
    	d3.select(this)
    		.attr("fill", colors[index]);
	});

// Set bar height
svg.selectAll("rect")
 	.data(accPerHour)
 	.attr("y", function(d) {
   		return yScale_bar(d);
   })
   .attr("height", function(d) {
   		return h1 - yScale_bar(d); /* number of accidents */
   })
   .append("title")
   .text(function(d) {
   		return "Number of accidents: " + d3.format(",.0")(d);
   	});

//Create X axis
svg.append("g")
	.attr("class", "x axis")
	.attr("transform", "translate(0," + h1 + ")")
	.call(xAxis_bar )
	.selectAll("text")
	.style("text-anchor", "end")
		.attr("dx", "-1.0em")
		.attr("dy", "-.55em")
		.attr("transform", "rotate(-90)" ); /* Setting x axis position, vertical */

//Create Y axis
svg.append("g")
	.attr("class", "y axis")
	.call(yAxis_bar);

// Add plot title
svg.append("text")
	.attr("class", "xy axis")
	.attr("transform", "translate("+ (w1 / 2) +","+ (margin_.left-75) +")")
	.text(currentBorough)
	.style("font-size", "20px");

// ------------------------------------------------------------------------ //
/* On click event: change year */
// ------------------------------------------------------------------------ //
d3.select("#year_toggle")
	.on("click", function() {
	// new bar_dataset values - meant to loop through values 2013 - 2016
	if (index < borough.length-1) {
		index +=  1;
		currentBorough = borough[index];
	}
	else {
		index = 0;
		currentBorough = borough[index];
	}

	/* Updating borough values*/
	/* Number of boroughs and the borough names will stay the same */
	accPerHour = Object.values(bar_dataset[currentBorough]);

	// Update all labels
	svg.selectAll("rect")
	   .data(accPerHour)
	   .transition()
	   .delay(function(d, i) {
   	       return i / numOfHours * 1000;
	   })
	   .duration(800)
	   .attr("y", function(d) {
		   return yScale_bar(d);
	   })
   	   .attr("height", function(d) {
   		   return h1 - yScale_bar(d); /* number of accidents */
   	   })
   	   .attr("fill", colors[index]);

   /* Adding new tooltip values as all rects have transitioned */
   svg.selectAll("rect")
   	  .data(accPerHour)
   	  .append("title")
      .text(function(d) {
   	  	  return "Accidents: " + d3.format(",.0")(d);
   	});

	//Update title
	svg.select(".xy.axis")
		.transition()
		.duration(1000)
        	.attr("transform", "translate("+ (w1 / 2) +","+ (margin_.left-75) +")")
    	.text(currentBorough)
    	.style("font-size", "20px"); 	
   	});
});


