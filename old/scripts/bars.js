// Working with chain syntax
var dataset = [ 25, 7, 5, 26, 11, 8, 24, 
				17, 19, 20, 30, 5, 10, 15, 
				20, 25, 18, 29 ];
// D3 code to print
d3.select("#bars").selectAll("div")
.data(dataset)
.enter()
.append("div")
.attr("class", "container bar")
.style("height", function(d){
	var barHeight = d * 5;
	return barHeight + "px";
});
