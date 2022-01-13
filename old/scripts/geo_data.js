// Visualizing geo data
  // Width and height
  var w = 900;
  var h = 600;
 
  // Global variables for data
  var datapoints_k2;
  var k;
  var centroids_k2;
  var centroids_k3;
  var centroids_k4;
  var centroids_k5;
  var centroids_k6;
  var districts;

      // Projection variable - mercator map view
      var projection = d3.geo.mercator()
                             .center([-122.433701, 37.767683])
                             .translate([w/2, h/2])
                             .scale([200000]);
 
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
           .attr("class", "feature")
           .style("fill", "steelblue")
           .attr("d", path);
      // Save data structure
      districts = json.features;
});

      // Loading crime data
      d3.json("model_data.json", function(cluster_data) {
          // Storing data
          // Datapoints for the clusters
          datapoints = cluster_data.datapoints
          // Centroids
          centroids_k2  = cluster_data.centroids.k2;
          centroids_k3  = cluster_data.centroids.k3;
          centroids_k4  = cluster_data.centroids.k4;
          centroids_k5  = cluster_data.centroids.k5;
          centroids_k6  = cluster_data.centroids.k6;
          // District for map

 
      // Using data update function to set initial data material
      // Setting initial number of clusters to 2 (showing as page is loaded first time)
      updateData(2);
      });
 
// Function to update/select correct data when button is clicked
function updateData(noOfClusters) {
    // Defining data to use for each button clicked
    if (noOfClusters == 2) {
        k = 'k2';
        centroids  = centroids_k2;
    } else if (noOfClusters == 3) {
        k = 'k3';
        centroids  = centroids_k3;
    } else if (noOfClusters == 4) {
        k = 'k4';
        centroids  = centroids_k4;
    } else if (noOfClusters == 5) {
        k = 'k5';
        centroids  = centroids_k5;
    } else {
        k = 'k6';
        centroids  = centroids_k6;
    }
 
       // Removing all previous text when repainting (labels/centroids..)
       svg.selectAll("text").remove();
 
      // Add plot title
      svg.append("text")
        .attr("class", "xy axis")
        .attr("transform", "translate("+ (w / 4) +","+ 50 +")")
        .text("PROSTITUTION IN SAN FRANSISCO, " + noOfClusters + " CLUSTERS")
        .style("font-size", "16px");
    
      // Add district labels to map
      svg.selectAll("text")
        .data(districts)
        .enter()
        .append("path:text")
          .text(function(d) { 
              return d.properties.DISTRICT; 
          })
          .attr("x", function(d){
              return path.centroid(d)[0];
          })
          .attr("y", function(d){
              return  path.centroid(d)[1];
          })
          .attr("text-anchor","middle")
          .attr('font-size','12pt');
  
    // Drawing data on map
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
              if (d[k] == 0) {
                  return "Red";
              } else if (d[k] == 1) {
                  return "Yellow";
              } else if (d[k] == 2) {
                  return "Blue";
              } else if (d[k] == 3) {
                  return "Green";
              } else if (d[k] == 4) {
                  return "Purple";
              } else {
                  return "Orange";
              }
       })
       .style("opacity", 0.6);
 
       // Removing all previous centroids when repainting
       svg.selectAll("circle.centroids").remove();
 
       // Drawing centroids w. stroke
       svg.selectAll("k2centroids")
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