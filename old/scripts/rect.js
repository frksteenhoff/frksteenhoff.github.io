	// Initialize data and width/height 
	var dataset = [5, 10, 15, 20, 25,38, 40, 21, 23, 18, 1];
	var wi = 400;
	var he = 160;
	var barPadding = 2;

	// Create SVG element
	var svg = d3.select("#rectWork")
				.append("svg")
				.attr("width", wi)
   				.attr("height", he);
	/* Creating rectangles to replace the bars */
	var rect = svg.selectAll("rect")
   			  .data(dataset)
   			  .enter()
   			  .append("rect")
      rect.attr({
          		"x":      function(d, i){ return i * (wi / dataset.length);},
   			      "y":      function(d)   { return he - (d * 4);},
   		       	"width":  wi / dataset.length - barPadding,
   			      "height": function(d) { return d * 4; },
   			      "fill":   function(d) { return "rgb(100, 100, " + (d * 5) + ")";}
   			});

        rect.selectAll("text")
        	.data(dataset)
        	.enter()
        	.append("text")
        	.text(function(d) {
        		return d;
        	})
        	.attr("text-anchor", "middle")
        	.attr("x", function(d, i) {
	   			return i * (wi / dataset.length) + (wi / dataset.length - barPadding) / 2;
	   		})
	   		.attr("y", function(d) {
	   			return he - (d * 4) + 14;
	   		})
	   		.attr("font-family", "sans-serif")
	   		.attr("font-size", "11px")
	   		.attr("fill", "black");