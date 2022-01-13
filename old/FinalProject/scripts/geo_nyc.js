var width  = 1200,
    height = 800,
    geo,
    centroids_13,
    centroids_14,
    centroids_15,
    centroids_16,
    datapoints,
    data;

// set projection
var projection = d3.geo.mercator()
                       .center([-73.92, 40.72])
                       .translate([width/2, height/2])
                       .scale([75000]);

// create path variable
var path = d3.geo.path()
              .projection(projection);

// create svg element
var svg1 = d3.select("#clustering")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + 30 + "," + 20 + ")");


// Load shapefile information
d3.json("data/NYCshapefile.JSON", function(topo) {
    geo = topo.features;
    svg1.selectAll("path")
        .data(geo)
        .enter()
        .append("path")
        .attr("class", "feature")
        .style("fill", "green")
        .attr("d", path);

});

d3.json("data/model_data.json", function(cluster_data) {
    // K-means based on four clusters
    datapoints = cluster_data.datapoints; 
    // Centroids
    centroids_13 = cluster_data.centroids.thirteen;
    centroids_14 = cluster_data.centroids.fourteen;
    centroids_15 = cluster_data.centroids.fifteen;
    centroids_16 = cluster_data.centroids.sixteen;

// Using update function to set initial data 
updateData(2013);
});

function updateData(yearToVisualize) {
    // Data to use for each possible button to click
    if(yearToVisualize == 2013){
      data      = datapoints.thirteen;;
      centroids = centroids_13;
    } else if(yearToVisualize == 2014) {
      data      = datapoints.fourteen;
      centroids = centroids_14;
    } else if(yearToVisualize == 2015) {
      data      = datapoints.fifteen;
      centroids = centroids_15;
    } else {
      data      = datapoints.sixteen;
      centroids = centroids_16;
    }

    // Removing all previous text and datapoints when repainting
    svg1.selectAll("text").remove();
    svg1.selectAll("circle.data.points").remove();

    // Add plot title
    svg1.append("text")
        .attr("class", "xy axis")
        .attr("transform", "translate("+ (w / 3) +","+ 30 +")")
        .text("4 CLUSTERS, " + yearToVisualize)
        .style("font-size", "20px");
  
     // Drawing data on map
     svg1.selectAll("cluster_data")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "data points")
        .attr("cx", function(d) {
                return projection([d.LONGITUDE, d.LATITUDE])[0];
        })
        .attr("cy", function(d) {
                return projection([d.LATITUDE, d.LATITUDE])[1];
        })
        .attr("r", 2)

        // Changing the filling such that it allows up to 6 colors
        .style("fill", function(d) {
               if (d["CLUSTER"] == 0) {
                   return "Red";
               } else if (d["CLUSTER"] == 1) {
                   return "Yellow";
               } else if (d["CLUSTER"] == 2) {
                   return "Blue";
               } else {
                   return "Purple";
               }
        })
      .style("opacity", 0.5);

     // Removing all previous centroids when repainting
     svg1.selectAll("circle.centroids").remove();

     // Drawing centroids w. stroke
     svg1.selectAll("k2centroids")
        .data(centroids)
        .enter()
        .append("circle")
        .attr("class", "centroids")
        .attr("cx", function(d) {
          return projection([d.LONGITUDE, d.LATITUDE])[0];
        })
        .attr("cy", function(d) {
          return projection([d.LONGITUDE, d.LATITUDE])[1];
        })
        .attr("r", 5)
        .style("fill", "none")
        .style("stroke", "black")
        .style("stroke-width","2")
        .style("opacity", 1);
}