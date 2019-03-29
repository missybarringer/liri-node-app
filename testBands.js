
var axios = require("axios");
var bandName = "";
var moment = require("moment");
var command = process.argv[2];
var parameter = process.argv.slice(3).join("+");

function switchCase() {
    switch(command) {
        case 'concert-this':
        bandsInTown(parameter);
        break;
        
        default:
        display("Invalid. I don't understand");
        break;
    }
};

// var spotify = "Spotify"
function bandsInTown(parameter) {
    var bandName = parameter;
    
    var queryBandsURL = "https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=codingbootcamp";
    
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
                    console.log("Venue: " + concert[j].venue.name);
                    console.log("Location: " + concert[j].venue.city);
                };
                console.log("\n------------------------------\n");
            }
        }
    );
};
switchCase();
