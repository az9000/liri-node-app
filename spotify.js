// environment variables
var dotenv = require('dotenv');
dotenv.config();

// import the keys file
var Spotify = require("node-spotify-api");
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

function getSong(song) {
  if (!song) {
    song = "The Sign";
  }

  spotify.search({ type: "track", query: song, limit: 5 }, function(err, data) {
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

module.exports = {
  getSong: getSong
};
