require('dotenv').config();
var request = require("request");


module.exports = function (callback) {
    // on click event for search submit button
    $("#searchSubmit").on("click", function (event) {
        event.preventDefault();
        console.log("I've been clicked!");
        // get the inputs from each of the fields
        var city = $("#city").val().trim();
        var state = $("#state").val().trim();
        var venueName = $("#venue").val().trim();

        // $.ajax({
        //     url: "https://api.foursquare.com/v2/venues/search?client_id=DJI2IAR1JVBJHOKACMOGQ0D31UFJJUGEGYOSQ3L30OSYWVUP&client_secret=LD2PAKPD1Y5PGJOPWMWWJI2X5Z5NFTQ1JUSYBL0AFFATQ50D&near=" + city + "," + state + "&query=" + venueName + "&v=20180515&limit=10",
        //     method: "GET"
        // }).then(function(response){
        //     console.log(response)
        // });

        request({
            url: "https://api.foursquare.com/v2/venues/search",
            method: "GET",
            qs: {
                client_id: process.env.fourSquare_API_client_id,
                client_secret: process.env.fourSquare_API_client_secret,
                near: city + ", " + state,
                query: venueName,
                v: 20180515,
                limit: 10
            },
        }, function (err, res, body) {
            if (err) {
                callback(err);
            }
            var venues = JSON.parse(body);
            var venueInfo = venues.response.venues;
            var searchResults = [];
            for (var i = 0; i < venueInfo.length; i++) {
                // create object for diplaying info in handlebars
                var eachResult = {
                    id: venueInfo[i].id,
                    name: venueInfo[i].name,
                    address: venueInfo[i].location.address,
                    city: venueInfo[i].location.city,
                    state: venueInfo[i].location.state,
                    zip: venueInfo[i].location.postalCode
                }
                // push each object into the array
                searchResults.push(eachResult);
            }

            callback(null, searchResults);
        });
    });
};

