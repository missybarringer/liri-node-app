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
            console.log("\n-----------------\n");
            console.log("Artist: "  + track.artists[0].name);
            console.log("Song: " + track.name);
            console.log("Link: " + track.preview_url);
            console.log("Album: " + track.album.name);
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
                console.log("Title: " + response.data.Title +"\nYear: " + response.data.Year + "\nIMDB Rating: " + response.data.imdbRating + 
                "\nRotten Tomatoes Rating: " + response.data.tomatoRating + "\nCountry: " + response.data.Country + "\nLanguage: " + response.data.Language +
                "\nPlot: " + response.data.Plot + "\nActors: " + response.data.Actors);
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
                        console.log("\n------------------------------\n");
                        console.log("Venue: " + concert[j].venue.name);
                        console.log("Location: " + concert[j].venue.city);
                        console.log(convertedDate);
                    };
                    console.log("\n------------------------------\n");
                } else {
                    for (var j = 0; j < concert.length; j++) {
                        var convertedDate = moment(concert[j].datetime).format("MM/DD/YYYY");
                        console.log("\n------------------------------\n");
                        console.log("Venue: " + concert[j].venue.name);
                        console.log("Location: " + concert[j].venue.city);
                        console.log(convertedDate);
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
        // var parameter = data.replace(/,/g , " ");
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

function display(printInfo) {
    console.log(printInfo);
    fs.appendFile("log.txt", printInfo, function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("Logged");
        }
    });
};

switchCase();