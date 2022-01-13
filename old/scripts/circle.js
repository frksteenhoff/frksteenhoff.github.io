// Initialize data and width/height 
var dataset = [5, 10, 15, 20, 25];
var wi = 500;
var he = 50;
// Create SVG element
var svg = d3.select("#circleWork")
			.append("svg")	
			.attr("width", wi)
			.attr("height", he);
// From basic SVG element properties, create circles
var circles = svg.selectAll("circle")
				 .data(dataset)
				 .enter()
				 .append("circle");
circles.attr("cx", function(d, i){
		return (i * 50) + 25;
		})
		.attr("cy", he/2)
		.attr("r", function(d){
			return d;
	});

