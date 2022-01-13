// Working with chain syntax, counting
var dataset = [ 0, 5, 10, 15, 20, 25 ];
d3.select("#count").selectAll("div")
	.data(dataset)
	.enter()
	.append("div")
	.text(function(d) { return "I can count to " + d; })
	.style("color", "grey");
