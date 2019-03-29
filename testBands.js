
var axios = require("axios");
var nodeArgType = process.argv[2];
var nodeArgs = process.argv;
var movieName = "";
var bandName = "";

// loop through all the words in the node argument
if (nodeArgType === "concert-this"){
for (var i = 3; i < nodeArgs.length; i++) {
    if (i > 3 && i < nodeArgs.length) {
        bandName = bandName + " " + nodeArgs[i];
    } else {
        bandName += nodeArgs[i];
    }
} 
}


console.log(nodeArgType);

var queryBandsURL = "https://rest.bandsintown.com/artists/" + bandName + "?app_id=codingbootcamp";

axios.get(queryBandsURL).then(
    function(response) {
        console.log("Title: " + response.data.name);
    }
);
