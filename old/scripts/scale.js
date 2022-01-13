// Working with scales
var dataset = [ [5, 20], [480, 90], [250, 50], [100, 33], [330, 95],
				[410, 12], [475, 44], [25, 67], [85, 21], [220, 88]
			  ];

// Dynamic scales
var xScale = d3.scale.linear()
			   .domain([0, d3.max(dataset, function(d) { return d[0]; })])
			   .range([0, w]);

var yScale = d3.scale.linear()
			   .domain([0, d3.max(dataset, function(d) { return d[1]; })])
			   .range([0, h]);