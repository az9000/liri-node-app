require("dotenv").config();
var Spotify = require("node-spotify-api");
var axios = require("axios");
var moment = require("moment");

// import the keys file
var keys = require("./keys.js");

// logger
var logger = require("./logger.js");

var spotify = new Spotify(keys.spotify);

// CLI entries
var command = process.argv[2];

switch (command) {
  case "spotify-this-song".toLowerCase():
  case "spotify-this-song,".toLowerCase(): {
    var song;
    if (!process.argv[3]) {
      song = "The Sign";
    } else {
      song = process.argv.slice(3);
    }
    logger.log(
      `${moment(new Date()).format(
        "MM/DD/YYYY hh:mm:ss a"
      )}: ${command}, ${process.argv.slice(3)}.`
    );
    if (song) {
      spotify.search({ type: "track", query: song }, function(err, data) {
        if (err) {
          return console.log("Error occurred: " + err);
        }
        const tracks = data.tracks;
        const items = tracks.items;
        var track = 1;
        for (var index in items) {
          console.group(`Track ${track}`);
          console.log("Preview:", items[index].external_urls.spotify + "\t");
          console.log("Album:  ", items[index].album.name + "\t");
          console.log("Song:   ", items[index].name + "\t");
          console.log("Artist: ", items[index].artists[0].name + "\t");
          console.groupEnd();
          track++;
        }
      });
    }
    break;
  }
  case "concert-this".toLowerCase():
  case "concert-this,".toLowerCase(): {
    var artist = process.argv[3];
    if (!process.argv[3]) {
      artist = "The Sign";
    } else {
      artist = process.argv.slice(3).join("+");
    }
    logger.log(
      `${moment(new Date()).format(
        "MM/DD/YYYY hh:mm:ss a"
      )}: ${command}, ${process.argv.slice(3)}.`
    );
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
    break;
  }
  case "movie-this".toLowerCase():
  case "movie-this,".toLowerCase(): {
    var movie = process.argv[3];
    if (!process.argv[3]) {
      movie = "Mr. Nobody";
    } else {
      movie = process.argv.slice(3).join("+");
    }
    logger.log(
      `${moment(new Date()).format(
        "MM/DD/YYYY hh:mm:ss a"
      )}: ${command}, ${process.argv.slice(3)}.`
    );
    var url = "http://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";
    axios
      .get(url)
      .then(function(response) {
        // handle success
        //console.log(response.data);
        if (!response.data.Title) {
          console.warn(`Unable to locate the movie ${movie} with OMDB API`);
        } else {
          console.group("Movie details:");
          console.log("Title                 :", response.data.Title);
          console.log("Year                  :", response.data.Year);
          console.log("IMDB Rating           :", response.data.Rated);

          if (response.data.Ratings) {
            response.data.Ratings.forEach(rating => {
              if (rating.Source === "Rotten Tomatoes") {
                console.log("Rotten Tomatoes Rating:", rating.Value);
              }
            });
          }
          console.log("Country of production :", response.data.Country);
          console.log("Language              :", response.data.Language);
          console.log("Plot                  :", response.data.Plot);
          console.log("Actors                :", response.data.Actors);
          console.groupEnd();
        }
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      })
      .finally(function() {
        // always executed
      });
    break;
  }
  case "do-what-it-says".toLowerCase():
  case "do-what-it-says,".toLowerCase(): {
    var junk = process.argv[3];
    if (!process.argv[3]) {
      console.warn("Nothing to do!");
      return;
    } else {
      junk = process.argv.slice(3).join("+");
    }
    logger.log(
      `${moment(new Date()).format(
        "MM/DD/YYYY hh:mm:ss a"
      )}: ${command}, ${process.argv.slice(3)}.`
    );
    console.log(junk);
    break;
  }
  default: {
    logger.log(
      `${moment(new Date()).format(
        "MM/DD/YYYY hh:mm:ss a"
      )}: ${command}, ${process.argv.slice(3)}.`
    );
    console.group("Cannot compute!");
    console.log("Please use one of the following commands:");
    var cmdArray = [
      {
        Command: "spotify-this-song",
        Parameter: "<song>"
      },
      {
        Command: "movie-this",
        Parameter: "<movie>"
      },
      {
        Command: "concert-this",
        Parameter: "<artist>"
      },
      {
        Command: "do-what-it-says",
        Parameter: "<anything>"
      }
    ];

    console.table(cmdArray);
    console.groupEnd();
    break;
  }
}
