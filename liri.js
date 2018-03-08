
require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var omdb = require('omdb');
var request = require("request");
var fs = require("fs");
console.log(keys)


var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

function spotifyThisSong(value) {
    spotify.search({
        type: 'track',
        query: value
    },
        function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            console.log("================================")
            console.log(data.tracks.items[0].artists[0].name);
            console.log(data.tracks.items[0].name);
            console.log(data.tracks.items[0].album.name);
            console.log(data.tracks.items[0].href);
            console.log("================================")

        });
}
function mytweets(value) {
    var params = { screen_name: 'classaccount018' };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                console.log("================================")
                console.log(tweets[i].text);
                console.log("================================")
                
            }
        }
    });
}

function moviethis(value){
    if(!value){
        value = "Mr. Nobody";
    }
    request("http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=trilogy", function(error, response, body) {
        if (!error && response.statusCode === 200) {
            var data = JSON.parse(response.body);
            console.log("================================")
            console.log("Title: " + data.Title);
            console.log("Year: " + data.Year);
            console.log("IMDB rating: " + data.imdbRating);
            console.log("Rotten Tomatoes Rating: " + data.Ratings[1].Value);
            console.log("Country: " + data.Country);
            console.log("Language(s): " + data.Language);
            console.log("Plot: " + data.Plot);
            console.log("Actors: " + data.Actors);
            console.log("================================")
        }
       
    });
}
function doit(value){

fs.readFile("random.txt", "utf8", function(error, data) {
    var input = (data.split(","))
    var command = input[0]
    var result = input[1]
    // If the code experiences any errors it will log the error to the console.
    if (error) {
      return console.log(error);
    }
  
    // We will then print the contents of data
    console.log("====================")
    console.log(input);
    liri(command, result)
  });
  
}

var action = process.argv[2];
var value = process.argv[3];

function liri(action, value) {
    switch (action) {
        case "spotify-this-song":
            spotifyThisSong(value);
            break;

        case "my-tweets":
            mytweets(value);
            break;

        case "movie-this":
            moviethis(value);
            break;
        
        case "do-what-it-says":
            doit(value);
            break;
    }

}

liri(action, value)


