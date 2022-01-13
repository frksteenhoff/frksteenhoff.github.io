// https://github.com/alignedleft/d3-book/blob/master/chapter_08/04_axes_y.html
// Creating a scatterplot
var wi = 400;
var he = 120;
var padding = 30;

var dataset = [ [5, 20], [480, 90], [250, 50], [100, 33], [330, 95],
				[410, 12], [475, 44], [25, 67], [85, 21], [220, 88]
			  ];

//Create scale functions
var xScale = d3.scale.linear()
					 .domain([0, d3.max(dataset, function(d) { return d[0]; })])
					 .range([padding, wi - padding * 2]);
var yScale = d3.scale.linear()
					 .domain([0, d3.max(dataset, function(d) { return d[1]; })])
					 .range([he - padding, padding]);
var rScale = d3.scale.linear()
					 .domain([0, d3.max(dataset, function(d) { return d[1]; })])
					 .range([2, 5]);

//Define X axis
var xAxis = d3.svg.axis()
				  .scale(xScale)
				  .orient("bottom")
				  .ticks(5);
//Define Y axis
var yAxis = d3.svg.axis()
				  .scale(yScale)
				  .orient("left")
				  .ticks(5);

var svg = d3.select("#scatter_circle")
			.append("svg")
			.attr("width", wi)
			.attr("height", he);

// From basic SVG element properties, create circles
	var scatter = svg.selectAll("circle")
				 .data(dataset)
				 .enter()
				 .append("circle");
	scatter.attr("cx", function(d){
					return xScale(d[0]);
			})
			.attr("cy", function(d) {
					return yScale(d[1]);
			})
			.attr("r", function(d) {
					return rScale(d[1]);
			});

			//Create labels
	scatter.selectAll("text")
		   .data(dataset)
		   .enter()
		   .append("text")
		   .text(function(d) {
		   		return d[0] + "," + d[1];
		   })
		   .attr("x", function(d) {
		   		return xScale(d[0]);
		   })
		   .attr("y", function(d) {
		   		return yScale(d[1]);
		   })
		   .attr("font-family", "sans-serif")
		   .attr("font-size", "11px")
		   .attr("fill", "red");
		
		//Create X axis
		scatter.append("g")
			.attr("class", "axis")
			.attr("transform", "translate(0," + (he - padding) + ")")
			.call(xAxis);
		
		//Create Y axis
		scatter.append("g")
			.attr("class", "axis")
			.attr("transform", "translate(" + padding + ",0)")
			.call(yAxis);
