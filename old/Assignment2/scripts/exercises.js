
// Global variable
var data;

// Reading in data from CSV file
d3.text("test_data.csv", function(rows) {
	data = rows.split("\n");

	// Doing something with data (outputting)
	d3.select("#exercise").selectAll("div")
		.data(data)
		.enter()
		.append("div")
		.text(function(d) { return "I can count to " + d; })
		.style("color", "grey");
});
