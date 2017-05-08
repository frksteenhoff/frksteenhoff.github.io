// ------------------------------------------------------------------------ //
// Global variables
// ------------------------------------------------------------------------ //
var max_all = 0,  // all time max num of accidents
    titleTxt = "Accidents per borough, NYC, ",
    borough = ["BRONX", "BROOKLYN", "MANHATTAN", "QUEENS", "STATEN ISLAND"],
    years_of_interest = [2013, 2014, 2015, 2016],
    year = 2013, // First year to visualize
    /* Margin and padding */
    margin_ = {top: 20, right: 50, bottom: 100, left: 50},
    w1      = 500 - margin_.left - margin_.right,
    h1      = 400 - margin_.top - margin_.bottom;
var bar_dataset;  // Initializing dataset
var numOfBoroughs, boroughNames, boroughValues;

// ------------------------------------------------------------------------ //
// Reading in json shapefile - accidents per year per borough
// ------------------------------------------------------------------------ //
d3.json("data/year_data.json", function(data) {
	bar_dataset = data;

	/* Find largest values within all years */
	for (var i = 0; i < years_of_interest.length; i++) {
		max_y = d3.max(Object.values(bar_dataset[years_of_interest[i]]));
		if(max_y > max_all) {
			max_all = max_y;
		}
	}
	/* Variables needed in subsequent part of script */
	numOfBoroughs = Object.keys(bar_dataset[year]).length;
	boroughNames  = Object.keys(bar_dataset[year]); 
	boroughValues = Object.values(bar_dataset[year]);

/* Setting script values for bar chart */
var xScale_bar = d3.scale.ordinal()
				.domain(boroughNames)
				.rangeRoundBands([0, w1], 0.05);

var yScale_bar = d3.scale.linear()
				.domain([0, max_all])
				.range([h1, 0]);

//Define X axis
var xAxis_bar  = d3.svg.axis()
			  .scale(xScale_bar)
			  .orient("bottom")
			  .ticks(6);

//Define Y axis
var yAxis_bar  = d3.svg.axis()
			  .scale(yScale_bar)
			  .orient("left")
			  .ticks(6);

//Create SVG element
var svg = d3.select("#incidents_all")
			.append("svg")
			.attr("width", w1 + margin_.left + margin_.right)
			.attr("height", h1 + margin_.top + margin_.bottom)
			.append("g")
			.attr("transform",
				  "translate(" + margin_.left + "," + margin_.top + ")");

//Create bars
svg.selectAll("rect")
   .data(boroughNames)
   .enter()
   .append("rect")
   .attr("x", function(d, i) {
   		return xScale_bar(d);
   })
   .attr("width", xScale_bar.rangeBand())
   .attr("fill", "darkgreen")
	.on("mouseover", function() {
    	d3.select(this)
    		.attr("fill", "orange");
	})
	.on("mouseout", function(d, i) {
    	d3.select(this)
    		.attr("fill", "darkgreen");
	});

// Set bar height
svg.selectAll("rect")
 	.data(boroughValues)
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
	.call(yAxis_bar );

// Add plot title
svg.append("text")
	.attr("class", "xy axis")
	.attr("transform", "translate("+ (w1 / 3) +","+ (margin_.left-55) +")")
	.text(titleTxt + year)
	.style("font-size", "16px");

// ------------------------------------------------------------------------ //
/* On click event: change year */
// ------------------------------------------------------------------------ //
d3.select("#year_toggle")
	.on("click", function() {
	// new bar_dataset values - meant to loop through values 2013 - 2016
	if (year < 2016) {
		year += 1;
	}
	else {
		year = 2013;
	}

	/* Updating borough values*/
	/* Number of boroughs and the borough names will stay the same */
	boroughValues = Object.values(bar_dataset[year]);
	console.log(boroughValues);

	// Update all labels
	svg.selectAll("rect")
	   .data(boroughValues)
	   .transition()
	   .delay(function(d, i) {
   	       return i / numOfBoroughs * 1000;
	   })
	   .duration(500)
	   .attr("y", function(d) {
		   return yScale_bar(d);
	   })
   	   .attr("height", function(d) {
   		   return h1 - yScale_bar(d); /* number of accidents */
   });

   /* Adding new tooltip values as all rects have transitioned */
   svg.selectAll("rect")
   	  .data(boroughValues)
   	  .append("title")
      .text(function(d) {
   	  	  return "Number of accidents: " + d3.format(",.0")(d);
   	});

	//Update title
	svg.select(".xy.axis")
		.transition()
		.duration(1000)
        	.attr("transform", "translate("+ (w1 / 3) +","+ (margin_.left-55) +")")
    	.text(titleTxt + year)
    	.style("font-size", "16px"); 	
   	});
});


