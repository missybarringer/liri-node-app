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

var command = process.argv[2];
var parameter = process.argv.slice(3).join("+");

function switchCase() {
    switch(command) {
        case 'spotify-this-song':
        spotifySong(parameter);
        break;
        
        default:
        display("Invalid. I don't understand");
        break;
    }
};

// Spotify function
function spotifySong(parameter) {

    var searchTrack;
    if (parameter === undefined) {
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
            console.log("\n-----------------\n");
            console.log("Artist: "  + track.artists[0].name);
            console.log("Song: " + track.name);
            console.log("Link: " + track.preview_url);
            console.log("Album: " + track.album.name);
            }
        }
    });
};
switchCase();