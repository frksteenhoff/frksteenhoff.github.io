// Global variables
var data;
var full_data = []; // all data for calculations
var dataset;        // taking value of one of the datasets
var dataset1  = []; // 2003 values
var dataset2  = []; // 2015 values
var toggle    = 1;  // Switch between datasets
var year      = 2003;
var numberOfDistricts = 10 

// Reading in data from CSV file
d3.text("crime_dict_all.csv", function(rows) {
	data = rows.split("\n");

	// Create arrays of each data type 2003
	for (var i = 1; i < numberOfDistricts+1; i++) {
		var row = data[i].split(";");
		var row2= data[i+numberOfDistricts].split(";");

		// Adding [noVehicleTheft, noProstitution, district] to array
		dataset1.push([parseInt(row[1]), parseInt(row[2]),  row[0]]);
		dataset2.push([parseInt(row2[1]),parseInt(row2[2]), row2[0]]);
	}	

	// Extract max x and y range
	for (var i = 1; i < data.length-1; i++) {
		var row = data[i].split(";");
		full_data.push([parseInt(row[1]),parseInt(row[2])]);
	}

	// Variables
	var w        = 800;
	var h        = 500;
	var padding  = 70;

		//Create scale functions
		var xScale = d3.scale.linear()
							 .domain([0, d3.max(full_data, function(d) { return d[1]; })])
							 .range([padding+5, w - padding * 2]);
		var yScale = d3.scale.linear()
							 .domain([0, d3.max(full_data, function(d) { return d[0]; })])
							 .range([h - padding, padding]);
		var rScale = d3.scale.linear()
							 .domain([0, d3.max(full_data, function(d) { return d[0]; })])
							 .range([1, 7]);

		//Define X axis
		var xAxis = d3.svg.axis()
						  .scale(xScale)
						  .orient("bottom")
						  .ticks(8);
		
		//Define Y axis
		var yAxis = d3.svg.axis()
						  .scale(yScale)
						  .orient("left")
						  .ticks(8);
			
		//Create SVG element
		var svg = d3.select("#scatter_crime")
					.append("svg")
					.attr("width", w)
					.attr("height", h);

		//Create circles
		svg.selectAll("circle")
		   .data(dataset1)
		   .enter()
		   .append("circle")
		   .attr("cx", function(d) {
		   		return xScale(d[1]);
		   })
		   .attr("cy", function(d) {
		   		return yScale(d[0]);
		   })
		   .attr("r", function(d) {
		   		return rScale(d[0]);
		   });

		// Create labels
		svg.selectAll("text")
			   .data(dataset1)
			   .enter()
			   .append("text")
			   .text(function(d) {
			   		return d[2];
			   })
			   .attr("x", function(d) {
			   		return xScale(d[1]+10);
			   })
			   .attr("y", function(d) {
			   		return yScale(d[0]);
			   })
			   .attr("font-family", "sans-serif")
			   .attr("font-size", "13px")
			   .attr("fill", "grey");

			//Create X axis
			svg.append("g")
				.attr("class", "x axis")
				.attr("transform", "translate(0," + (h - padding) + ")")
				.call(xAxis);
			
			//Create Y axis
			svg.append("g")
				.attr("class", "y axis")
				.attr("transform", "translate(" + padding + ",0)")
				.call(yAxis);
	
		// Add axis labels x
        svg.append("text")
            .attr("text-anchor", "middle")
            .attr("transform", "translate("+ (padding/6) +","+(h / 2)+")rotate(-90)")  
            .text("VEHICLE THEFT");

		// Add axis labels y
        svg.append("text")
            .attr("text-anchor", "middle") 
            .attr("transform", "translate("+ (w / 2) +","+(h - padding/5)+")")
            .text("PROSTITUTION");

		// Add plot title
        svg.append("text")
			.attr("class", "xy axis")
            .attr("transform", "translate("+ (w / 3) +","+ (padding/2) +")")
            .text("CRIME IN SAN FRANSISCO, " + year)
            .style("font-size", "16px");

		//On click, update with new data			
		d3.select("#year_toggle")
			.on("click", function() {
				// Oscillating between the two datasets
				if (toggle == 1) {
					dataset = dataset2;
					toggle  = 0;
					year    = 2015;
				} else {
					dataset = dataset1;
					toggle = 1;
					year   = 2003;
				} 

				//Update all circles
				svg.selectAll("circle")
				   .data(dataset)
				   .transition()
				   .duration(800)
				   .each("start", function() {
			     	  d3.select(this)
				   	  .attr("fill", "red")
				      .attr("r", function(d) {
		   				  return rScale(d[0]);
				    	})
				    })
				   .attr("cx", function(d) {
				   		return xScale(d[1]);
				   })
				   .attr("cy", function(d) {
				   		return yScale(d[0]);
				   })
				   .each("end", function() {
					   d3.select(this)
					     .attr("fill", "black")
					     .attr("r", function(d) {
		   					 return rScale(d[0]);
				   		 });
				   	});

				// Update all labels
				svg.selectAll("text")
				   .data(dataset)
				   .transition()
				   .duration(2000)	
			       .text(function(d) {
			      		return d[2];
			       })
			       .attr("x", function(d) {
			   		    return xScale(d[1]+10);
			       })
			       .attr("y", function(d) {
			      		return yScale(d[0]);
			       })
			       .attr("font-family", "sans-serif")
			       .attr("font-size", "13px")
			       .attr("fill", "grey");

				//Update X axis
				svg.select(".x.axis")
			    	.transition()
			    	.duration(1000)
					.call(xAxis);
				
				//Update Y axis
				svg.select(".y.axis")
			    	.transition()
			    	.duration(1000)
					.call(yAxis);       

				//Update title
				svg.select(".xy.axis")
			    	.transition()
			    	.duration(1000)
	   	            .attr("transform", "translate("+ (w / 3) +","+ (padding/2) +")")
    		        .text("CRIME IN SAN FRANSISCO, " + year)
    		        .style("font-size", "16px"); 	
			});
});