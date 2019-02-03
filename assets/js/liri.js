require("dotenv").config();
var axios=require("axios");
var operation=process.argv[2];
var term=process.argv[3];
var keys=require("./keys.js")
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var fs=require("fs");
var moment=require("moment");

// MAIN FUNCTION
checkCommand(operation,term);
// Check for function call
function checkCommand(operation,term){
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
}

     // A FUNCTION TO SEARCH FOR A BAND EVENT AND PRINT THE INFORMATION
     //
     // * Name of the venue
     //
     // * Venue location
     //
     // * Date of the Event
    function concertThis(artist){

      axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(function(response){
        var data=response.data;
        var date=data[0].datetime;
        if (response.data!=null) {
            console.log("\nVenue Name: "+data[0].venue.name+"\nVenue Location: "+data[0].venue.city+"\nEvent Date: "+moment(date).format('MMMM Do YYYY, h:mm:ss a'));
        }
        else {
          console.log("\nNo Event Data available for this Band, try a different search")
        }
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

// Takes the input and performs a search on Spotify API and prints out the results
     function spotifyThisSong(term){
      if(term!=null || term!=""){
        spotify.search({ type: 'track,album', query: ''+term}).then(function(response) {

            firstSong=response.tracks.items[0];
            var songInfo=[
              "Artists: "+firstSong.artists[0].name,
              "Song Title: "+firstSong.name,
              "Preview Link: "+firstSong.preview_url,
              "Album: "+firstSong.album.name
            ].join("\n\n");
            console.log(songInfo);
          }).catch(function(err) {
            console.log(err);
          });
      }
      else{
        spotify.search({ type: 'track', query: "The Sign" }).then(function(response) {
            console.log(response);
          }).catch(function(err) {
            console.log(err);
          });
      }

    }


   // A FUNCTION THAT SEARCHES OMDB FOR A MOVIE TITLE AND PRINTS THE FOLLOWING:
   //     * Title of the movie.
   //     * Year the movie came out.
   //     * IMDB Rating of the movie.
   //     * Rotten Tomatoes Rating of the movie.
   //     * Country where the movie was produced.
   //     * Language of the movie.
   //     * Plot of the movie.
   //     * Actors in the movie.

    function movieThis(term){
      console.log("MOVIE THIS: ", term);
      axios.get("http://www.omdbapi.com/?t="+term+"&apikey="+keys.omdb.key).then(function(response){
        // console.log(response.data);
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


// A text file that contains the name of a function and a term to search. Performs that operation and term respectfully.
    function doWhatItSays(){
      fs.readFile("../media/random.txt", "utf8", function(err, data){
          if (err) {
              return console.log(err);
              }
              var str=data;
              var command=data.split(",");
              checkCommand(command[0],command[1]);
          });
    }
