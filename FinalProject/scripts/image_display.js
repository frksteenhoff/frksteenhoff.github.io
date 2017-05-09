
  var months = ["January", "February", "March", "April" ,"May", "June",
                "July", "August", "September", "October", "November","December"];
  var images     = [], x = -1;
  var yearRange  = ["13", "14", "15", "16"];

  // Setting images with odd number of months
  images[0] = "images/geo/geo12_7.png";
  images[1] = "images/geo/geo12_8.png";
  images[2] = "images/geo/geo12_9.png";
  images[3] = "images/geo/geo12_10.png";
  images[4] = "images/geo/geo12_11.png";
  images[5] = "images/geo/geo12_12.png";

  var k = 6; // keeping track of num of image
    for (i = 0; i < yearRange.length; i++) {
      for (j = 1; j < 13; j++) {
        images[k] = "images/geo/geo" + yearRange[i] + "_" + j + ".png";
        k += 1;
      }
    } 

  images[k] = "images/geo/geo17_1.png";
  images[k+1] = "images/geo/geo17_2.png";
  images[k+2] = "images/geo/geo17_3.png";


  // Functions to display correct image at correct time
  function displayNextImage() {
      x = (x === images.length - 1) ? 0 : x + 1;
      document.getElementById("img").src = images[x];
      year  = images[x].split("_")[0];
      month = images[x].split("_")[1]
      // Print correct string on picture
      fullYear = "20" + year.substr(14,16);
      monthName = months[month.split(".")[0]-1];
      // 
      document.getElementById("text-on-geo").innerHTML = fullYear + ", " + monthName;
  }

  function startTimer() {
      setInterval(displayNextImage, 1000);
  }