require("dotenv").config();
var axios=require("axios");
var operation=process.argv[2];
var term=process.argv[3];
var keys=require("./keys.js")
var spotify = require('node-spotify-api');



// Check for function call
if(operation==="concertThis"){
  concertThis(term);
}
else if (operation==="spotifyThisSong") {
spotifyThisSong(term);
}
else if (operation==="movieThis") {
movieThis(term);
}
else if (operation==="doWhatItSays") {
doWhatItSays();
}
else if(operation==="?"){
  console.log("\nList of available commands: \nnode liri.js concertThis 'bandName' \nnode liri.js spotifyThisSong 'songName'  \nnode liri.js movieThis 'movieName' \nnode liri.js doWhatItSays ");
}
else {
  console.log("\nUnknown Command, Please try a valid command. If you need help type: node liri.js ?");
}



  // var spotify = new Spotify(keys.spotify);


     //* This will search the Bands in Town Artist Events API
     // (`"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"`)
     // for an artist and render the following information about each
     // event to the terminal:
     //
     // * Name of the venue
     //
     // * Venue location
     //
     // * Date of the Event (use moment to format this as "MM/DD/YYYY")
    function concertThis(artist){

      axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(function(response){
        console.log(response);
      })  .catch(function(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an object that comes back with details pertaining to the error that occurred.
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
  });


    }


//     // `node liri.js spotify-this-song '<song name here>'`
//     * This will show the following information about the song in your terminal/bash window
//
//   * Artist(s)
//
//   * The song's name
//
//   * A preview link of the song from Spotify
//
//   * The album that the song is from
//
// * If no song is provided then your program will default to "The Sign" by Ace of Base.
//
// * You will utilize the [node-spotify-api](https://www.npmjs.com/package/node-spotify-api) package in order to retrieve song information from the Spotify API.
//
// * The Spotify API requires you sign up as a developer to generate the necessary credentials. You can follow these steps in order to generate a **client id** and **client secret**:
//
// * Step One: Visit <https://developer.spotify.com/my-applications/#!/>
//
// * Step Two: Either login to your existing Spotify account or create a new one (a free account is fine) and log in.
//
// * Step Three: Once logged in, navigate to <https://developer.spotify.com/my-applications/#!/applications/create> to register a new application to be used with the Spotify API. You can fill in whatever you'd like for these fields. When finished, click the "complete" button.
//
// * Step Four: On the next screen, scroll down to where you see your client id and client secret. Copy these values down somewhere, you'll need them to use the Spotify API and the [node-spotify-api package](https://www.npmjs.com/package/node-spotify-api).
    function spotifyThisSong(term){
      spotify.search({ type: 'track', query: term }).then(function(response) {
          console.log(response);
        }).catch(function(err) {
          console.log(err);
        });
    }


   //  `node liri.js movie-this '<movie name here>'`
   //
   // * This will output the following information to your terminal/bash window:
   //
   //   ```
   //     * Title of the movie.
   //     * Year the movie came out.
   //     * IMDB Rating of the movie.
   //     * Rotten Tomatoes Rating of the movie.
   //     * Country where the movie was produced.
   //     * Language of the movie.
   //     * Plot of the movie.
   //     * Actors in the movie.
   //   ```
   //
   // * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
   //
   //   * If you haven't watched "Mr. Nobody," then you should: <http://www.imdb.com/title/tt0485947/>
   //
   //   * It's on Netflix!
   //
   // * You'll use the `axios` package to retrieve data from the OMDB API. Like all of the in-class activities, the OMDB API requires an API key. You may use `trilogy`.
    function movieThis(term){
      console.log("MOVIE THIS: ", term);
      axios.get("http://www.omdbapi.com/?t="+term+"&apikey="+keys.omdb.key).then(function(response){
        console.log(response.data);
        var data=response.data;
        console.log("\nTitle: "+data.Title+"\nYear: "+data.Year+"\nIMDB Rating: "+data.imdbRating+"\nRotten Tomatos Rating: "
        +data.Ratings[1].Value+"\nCountry Produced In: "+data.Country+"\nLanguage: "+data.Language+"\nPLOT: "+data.Plot+"\nActors: "+data.Actors);

      }).catch(function(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an object that comes back with details pertaining to the error that occurred.
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
  });
    }


  // `node liri.js do-what-it-says`
  //
  //  * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
  //
  //    * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
  //
  //    * Edit the text in random.txt to test out the feature for movie-this and concert-this.

    function doWhatItSays(){

    }
