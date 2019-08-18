var axios = require("axios");
var moment = require("moment");

function getTour(artist) {
  if (!artist) {
    artist = "The Sign";
  }
  
  var url =
    "https://rest.bandsintown.com/artists/" +
    artist +
    "/events?app_id=codingbootcamp";
  
  axios
    .get(url)
    .then(function(response) {
      // handle success
      if (response.data.length === 0) {
        console.log(
          `No concert dates were found for ${process.argv.slice(3)}!`
        );
        return;
      }
      
      var index = 1;
      response.data.forEach(element => {
        var venue = element.venue;
        console.group(`Venue ${index}`);
        console.log("Venue:       ", venue.name);
        console.log("Location:    ", venue.city + ", " + venue.country);
        console.log(
          "Concert Date:",
          moment(element.datetime).format("MM/DD/YYYY")
        );
        console.groupEnd();
        index++;
      });
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    })
    .finally(function() {
      // always executed
    });
}

module.exports = {
  getTour: getTour
};
