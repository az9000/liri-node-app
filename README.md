# liri-node-app
LIRI is a Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

## Objective
Using a terminal, the user should be able to enter specific commands, and parameters, and the APP will go and fetch specific data responses from different web APIs.

## Structure
There are multiple independent JavaScript files (one for each component), that are called out by the entry code (liri.js). The following are the files used:

1. **liri.js** - entry file where CLI commands are processed<br>
1. **logger.js** - used to log CLI commands entered to a text file (log.txt)<br>
1. **spotify.js.js** - used retrieve song information, using <a href="https://www.npmjs.com/package/node-spotify-api">node-spotify-api</a> node module<br>
1. **movie.js.js** - used to retrieve movie information, using the <a href="http://www.omdbapi.com/">OMDBI API</a><br>
1. **concert.js.js** - used to retrieve tour information of an artist, using the <a href="http://www.artists.bandsintown.com/bandsintown-api">Bands in town API</a><br>

  * The Spotify API key is saved in a ".env" file.</li>
  * Moment JS is used to format date and time for logs.</li>
 
 
 ## How to use
 1. Clone, or download this repository <br>
 1. Install dependencies <br>
   `$ npm install` <br>
 1. Edit example.env file <br>
 1. Enter User's Spotify API key and Secret <br>
 1. Rename example.env to .env <br>
 1. Run the App <br>
 * Spotify song query: <br>
 `$ node liri.js spotify-this-song Hotel California` <br>
 * OMDB movie query: <br>
 `$ node liri.js movie-this The Godfather` <br>
 * Bands In Town tour query: <br>
 `$ node liri.js concert-this The Who` <br>
 * Random search: <br>
 ** Edit the text in random.txt to test out the feature for spotify-this-song, movie-this and concert-this commands <br>
 
  ## Demo
  ![Video Demo](https://drive.google.com/file/d/1duPkuHpTMXLrYYnSPI3YTS-QJTurmhZ3/view)
  <br>
  
  
  
 
