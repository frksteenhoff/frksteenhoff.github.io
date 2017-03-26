// Visualizing geo data
	// Width and height
	var w = 600;
	var h = 300;

  // Global variables for data
  var datapoints_k2;
  var datapoints_k3;
  var datapoints_k4;
  var datapoints_k5;
  var datapoints_k6;
  var centroids_k2;
  var centroids_k3;
  var centroids_k4;
  var centroids_k5;
  var centroids_k6;

      // Projection variable
      var projection = d3.geo.mercator()
                             .center([-122.433701, 37.767683])
                             .translate([w/2, h/2])
                             .scale([100000]);

      // Path variable
      var path = d3.geo.path()
                       .projection(projection);

      //Create SVG element
		var svg = d3.select("#geo_data")
					.append("svg")
					.attr("width", w)
					.attr("height", h);

      // Loading geodata
      d3.json("sfpddistricts.json", function(json) {
        svg.selectAll("path")
           .data(json.features)
           .enter()
           .append("path")
           .attr("d", path)
           .style("fill", "steelblue");
       });

      // Loading crime data
      d3.json("model_data.json", function(cluster_data) {
        	// storing data
      		datapoints_k2 = cluster_data.datapoints.k2;
          datapoints_k3 = cluster_data.datapoints.k3;
        	datapoints_k4 = cluster_data.datapoints.k4;
        	datapoints_k5 = cluster_data.datapoints.k5;
        	datapoints_k6 = cluster_data.datapoints.k6;
        	centroids_k2  = cluster_data.centroids.k2;
        	centroids_k3  = cluster_data.centroids.k3;
        	centroids_k4  = cluster_data.centroids.k4;
          centroids_k5  = cluster_data.centroids.k5;
        	centroids_k6  = cluster_data.centroids.k6;

        // Drawing data
        svg.selectAll("k2data")
           .data(datapoints_k2)
           .enter()
           .append("circle")
           .attr("class", "data points")
           .attr("cx", function(d) {
                   return projection([d.lon, d.lat])[0];
           })
           .attr("cy", function(d) {
                   return projection([d.lon, d.lat])[1];
           })
           .attr("r", 2)
           .style("fill", function(d) {
                  if (d.Cluster == 1) {	
                    return "Yellow";
                  } else {
                    return "Red";
                  }
           })
           .style("opacity", 0.6);

           // Drawing data
           svg.selectAll("k2centroids")
              .data(centroids_k2)
              .enter()
              .append("circle")
              .attr("class", "centroids")
              .attr("cx", function(d) {
                return projection([d.lon, d.lat])[0];
              })
              .attr("cy", function(d) {
                return projection([d.lon, d.lat])[1];
              })
              .attr("r", 5)
              .style("fill", "none")
              .style("stroke", "black")
              .style("stroke-width","2")
              .style("opacity", 1);
      });

function updateData(noOfClusters) {
    // Defining data to use for each button clicked
    if (noOfClusters == 2) {
        datapoints = datapoints_k2;
        centroids  = centroids_k2;
    } else if (noOfClusters == 3) {
        datapoints = datapoints_k3;
        centroids  = centroids_k3;
    } else if (noOfClusters == 4) {
        datapoints = datapoints_k4;
        centroids  = centroids_k4;
    } else if (noOfClusters == 5) {
        datapoints = datapoints_k5;
        centroids  = centroids_k5;
    } else {
        datapoints = datapoints_k6;
        centroids  = centroids_k6;
    }

    // Drawing data
    svg.selectAll("k2data")
       .data(datapoints)
       .enter()
       .append("circle")
       .attr("class", "data points")
       .attr("cx", function(d) {
               return projection([d.lon, d.lat])[0];
       })
       .attr("cy", function(d) {
               return projection([d.lon, d.lat])[1];
       })
       .attr("r", 2)

       // Changing the filling such that it allows up to 6 colors
       .style("fill", function(d) {
              if (d.Cluster == 0) { 
                  return "Red";
              } else if (d.Cluster == 1) {
                  return "Yellow";
              } else if (d.Cluster == 2) {
                  return "Blue";
              } else if (d.Cluster == 3) {
                  return "Green";
              } else if (d.Cluster == 4) {
                  return "Purple";
              } else {
                  return "Orange";
              }

       })
       .style("opacity", 0.6);
       // Drawing data - centroids w. stroke
       svg.selectAll("kcentroids")
          .data(centroids)
          .enter()
          .append("circle")
          .attr("class", "centroids")
          .attr("cx", function(d) {
            return projection([d.lon, d.lat])[0];
          })
          .attr("cy", function(d) {
            return projection([d.lon, d.lat])[1];
          })
          .attr("r", 5)
          .style("fill", "none")
          .style("stroke", "black")
          .style("stroke-width","2")
          .style("opacity", 1);  

}