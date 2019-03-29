
var axios = require("axios");
var nodeArgType = process.argv[2];
var nodeArgs = process.argv;
var movieName = "";

// loop through all the words in the node argument
if (nodeArgType === "movie-this"){
for (var i = 3; i < nodeArgs.length; i++) {
    if (i > 3 && i < nodeArgs.length) {
        movieName = movieName + " " + nodeArgs[i];
    } else {
        movieName += nodeArgs[i];
    }
} 
}


var queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

axios.get(queryURL).then(
    function(response) {
        console.log("Title: " + response.data.Title +"\nYear: " + response.data.Year + "\nIMDB Rating: " + response.data.imdbRating + 
        "\nRotten Tomatoes Rating: " + response.data.tomatoRating + "\nCountry: " + response.data.Country + "\nLanguage: " + response.data.Language +
        "\nPlot: " + response.data.Plot + "\nActors: " + response.data.Actors);
    }
);
console.log(nodeArgType);
