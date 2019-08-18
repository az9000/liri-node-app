var axios = require("axios");

function getMovie(movie) {
  if (!movie) {
    movie = "Mr. Nobody";
  }

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
}

module.exports = {
  getMovie: getMovie
};
