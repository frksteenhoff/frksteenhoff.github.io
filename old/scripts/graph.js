	//Width and height
	var w = 800;
	var h = 400;
	//Original data
	var dataset = {
		nodes: [
			{ name: "Adam" },
			{ name: "Bob" },
			{ name: "Carrie" },
			{ name: "Donovan" },
			{ name: "Edward" },
			{ name: "Felicity" },
			{ name: "George" },
			{ name: "Hannah" },
			{ name: "Iris" },
			{ name: "Jerry" },
			{ name: "Henriette" },
			{ name: "Josefine" },
			{ name: "Caroline" },
			{ name: "Katrine" }
		],
		edges: [
			{ source: 0, target: 1 },
			{ source: 0, target: 2 },
			{ source: 0, target: 3 },
			{ source: 0, target: 4 },
			{ source: 1, target: 5 },
			{ source: 1, target: 9 },
			{ source: 2, target: 5 },
			{ source: 2, target: 9 },
			{ source: 3, target: 5 },
			{ source: 3, target: 4 },
			{ source: 5, target: 8 },
			{ source: 5, target: 9 },
			{ source: 6, target: 7 },
			{ source: 7, target: 8 },
			{ source: 8, target: 9 },
			{ source: 8, target: 10 },
			{ source: 10,  target: 4 },
			{ source: 10, target: 12 },
			{ source: 10, target: 7 },
			{ source: 11, target: 13 },
			{ source: 12,  target: 2 },
			{ source: 13,  target: 5 }
		]
	};
	//Initialize a default force layout, using the nodes and edges in dataset
	var force = d3.layout.force()
						 .nodes(dataset.nodes)
						 .links(dataset.edges)
						 .size([w, h])
						 .linkDistance([70])
						 .charge([-200])
						 .start();
	var colors = d3.scale.category10();
	var colors = d3.scale.category10();
	//Create SVG element
	var svg = d3.select("#graph")
				.append("svg")
				.attr("text-align", "center")
				.attr("width", w)
				.attr("height", h);
	
	//Create edges as lines
	var edges = svg.selectAll("line")
		.data(dataset.edges)
		.enter()
		.append("line")
		.style("stroke", "#dbdcdd")
		.style("stroke-width", 1);
	
	//Create nodes as circles
	var nodes = svg.selectAll("circle")
		.data(dataset.nodes)
		.enter()
		.append("circle")
		.attr("r", 14)
		.style("fill", function(d, i) {
			return colors(i);
		})
		.call(force.drag);
	
	//Every time the simulation "ticks", this will be called
	force.on("tick", function() {
		edges.attr("x1", function(d) { return d.source.x; })
			 .attr("y1", function(d) { return d.source.y; })
			 .attr("x2", function(d) { return d.target.x; })
			 .attr("y2", function(d) { return d.target.y; });
	
		nodes.attr("cx", function(d) { return d.x; })
			 .attr("cy", function(d) { return d.y; });
	});
