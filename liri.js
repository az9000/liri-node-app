const spotifyThisSong = require("./spotify.js");
const concertThis = require("./concert.js");
const movieThis = require("./movie.js");
const doWhatItSays = require("./etc.js");

// logger
const logger = require("./logger.js");

var liri_cli = {
  help: function() {
    console.clear();
    console.log("Please enter one of the following commands:");
    var cmdArray = [
      {
        Command: "node liri.js spotify-this-song",
        Parameter: "<song>"
      },
      {
        Command: "node liri.js movie-this",
        Parameter: "<movie>"
      },
      {
        Command: "node liri.js concert-this",
        Parameter: "<artist>"
      },
      {
        Command: "node liri.js do-what-it-says",
        Parameter: "<anything>"
      }
    ];

    console.table(cmdArray);
    console.groupEnd();
  },
  "spotify-this-song": function(song) {
    logger.log(`${command}, ${song}.`);

    console.clear();
    spotifyThisSong.getSong(song);
  },
  "concert-this": function(artist) {
    logger.log(`${command}, ${artist}.`);

    console.clear();
    concertThis.getTour(artist);
  },
  "movie-this": function(movie) {
    logger.log(`${command}, ${movie}.`);

    console.clear();
    movieThis.getMovie(movie);
  },
  "do-what-it-says": function() {
    

    console.clear();
    var data = doWhatItSays.do();
    data.on('line', (line) => {
      const cmd = line.split(',')[0];
      const param = line.split(',')[1];
      if (cmd && param) {
        logger.log(`${cmd}, ${param}.`);
        liri_cli[cmd.toLowerCase()](param);
      }
    });
  }
};

// CLI entries
const command = process.argv[2];
if (liri_cli.hasOwnProperty(command.toLowerCase())) {
  liri_cli[command.toLowerCase()](process.argv.slice(3).join(" "));
} else {
  console.log("huh?");
  logger.log(`${command}, ${process.argv.slice(3).join(" ")}.`);

  console.clear();
  console.group("Cannot compute!", command);
  console.log("Please use one of the following commands:");
  var cmdArray = [
    {
      Command: "node liri.js spotify-this-song",
      Parameter: "<song>"
    },
    {
      Command: "node liri.js movie-this",
      Parameter: "<movie>"
    },
    {
      Command: "node liri.js concert-this",
      Parameter: "<artist>"
    },
    {
      Command: "node liri.js do-what-it-says",
      Parameter: "<anything>"
    }
  ];

  console.table(cmdArray);
  console.groupEnd();
}
