// Make it so liri.js can take in one of the following commands:
// * `concert-this`
// * `spotify-this-song`
// * `movie-this`
// * `do-what-it-says`
// Approached by getting all 3 API's successfully retrieving the appropriate data in their own .js file
// then merged into 1 file to create liri.js
// code to read and set any environment variables with the dotenv package
require("dotenv").config();

var fs = require("fs");
// code required to import the `keys.js` file and store it in a variable.
var keys = require("./keys.js");
// include the axios npm package
var axios = require("axios");
// include the spotify npm package
var Spotify = require("node-spotify-api");
// access your keys information
var spotify = new Spotify(keys.spotify);
// include the moment npm package for date formatting
var moment = require("moment");

var command = process.argv[2];
var parameter = process.argv.slice(3).join("+");

function switchCase() {
    switch(command) {
        case 'spotify-this-song':
        spotifySong(parameter);
        break;
        case 'movie-this':
        movieOMDB(parameter);
        break;
        case 'concert-this':
        bandsInTown(parameter);
        break;
        case 'do-what-it-says':
        readRandom(parameter);
        break;

        default:
        console.log("Invalid. I don't understand");
        break;
    }
};

// Spotify API function
function spotifySong(parameter) {

    var searchTrack;
    
    if (parameter === "") {
        searchTrack = "Ace of Base The Sign";
    }else{
        searchTrack = parameter;
    }
    spotify.search({
        type: 'track',
        query: searchTrack
    }, function(error, data) {
        if (error) {
            display('Error: ' + error);
            return;
        } else {
            for (var i = 0; i < 5; i++){
            var track = data.tracks.items[i];
            if (track.preview_url === null){
                track.preview_url = "Not provided";
            }
            var mySong = "\n+++++++++++++++++++\n" + "\n\n" +
                         "Artist: " + track.artists[0].name + "\n" +
                         "Song: " + track.name + "\n" +
                         "Link: " + track.preview_url + "\n" +
                         "Album: " + track.album.name + "\n"
                         console.log(mySong);
                         writeToLog(mySong);
            }
        }
    });
};

// OMDB API function
function movieOMDB(parameter){
    if (parameter === "") {
        parameter = "Mr. Nobody";
    }
    var queryURL = "http://www.omdbapi.com/?t=" + parameter + "&y=&plot=short&apikey=trilogy";

        axios.get(queryURL).then(
            function(response) {
                if (response.data.tomatoRating = "undefined"){
                    response.data.tomatoRating = "Not provided";
                }
                var myMovie = "\n+++++++++++++++++++\n" + "\n" +
                "Title: " + response.data.Title + "\n" +
                "Year: " + response.data.Year + "\n" +
                "IMDB Rating: " + response.data.imdbRating + "\n" +
                "Rotten Tomatoes Rating: " + response.data.tomatoRating + "\n" +
                "Country: " + response.data.Country + "\n" +
                "Language: " + response.data.Language + "\n" +
                "Plot: " + response.data.Plot + "\n" +
                "Actors: " + response.data.Actors
                console.log(myMovie);
                writeToLog(myMovie);
            }
        );
    };

// BandsInTown API function
function bandsInTown(parameter) {
    if (parameter === "") {
        console.log("You forgot to enter the band");
    } else {
    var queryBandsURL = "https://rest.bandsintown.com/artists/" + parameter + "/events?app_id=codingbootcamp";
    
        axios.get(queryBandsURL).then(
            function(response) {
                var concert = response.data;
                console.log(concert.length);
                if (concert.length > 5) {
                    for (var j = 0; j < 5; j++) {
                        var convertedDate = moment(concert[j].datetime).format("MM/DD/YYYY");
                        var myBand = "\n+++++++++++++++++++\n" + "\n" +
                                     "Venue: " + concert[j].venue.name + "\n" +
                                     "Location: " + concert[j].venue.city + "\n" +
                                     convertedDate
                        console.log(myBand);
                        writeToLog(myBand);
                    };
                    console.log("\n------------------------------\n");
                } else {
                    for (var j = 0; j < concert.length; j++) {
                        var convertedDate = moment(concert[j].datetime).format("MM/DD/YYYY");
                        var myBand = "\n+++++++++++++++++++\n" + "\n" +
                                     "Venue: " + concert[j].venue.name + "\n" +
                                     "Location: " + concert[j].venue.city + "\n" +
                                     convertedDate
                        console.log(myBand);
                        writeToLog(myBand);
                    };
                    console.log("\n------------------------------\n");
                }
            }
        );
    };
};

// read randome.txt file to figure out which function to run
function readRandom() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        // log any errors to the console
        if (error) {
            return console.log(error);
        }
        var dataArr = data.split(",")
        var parameter = (dataArr[1]);
        var commandText = data.substr(0,data.indexOf(","))
        console.log(commandText);
        console.log(parameter);
        switch(commandText) {
            case 'spotify-this-song':
            spotifySong(parameter);
            break;
            case 'movie-this':
            movieOMDB(parameter);
            break;
            case 'concert-this':
            bandsInTown(parameter);
            break;
    
            default:
            console.log("Invalid. I don't understand");
            break;
        }
    });
};

// Bonus
// In addition to logging the data to the terminal window, output the data to a .txt file called log.txt
// Append each command to the file without overwriting the file
function writeToLog(printInfo) {
    fs.appendFile("log.txt", printInfo, function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("\n+++++++++++++++++++\n");
            console.log("Logged to log.txt file");
        }
    });
};

switchCase();