require("dotenv").config();

var request = require("request");

// get the inputs from each of the fields

module.exports = function (VENUE_ID, callback) {
    var url = "https://api.foursquare.com/v2/venues/" + VENUE_ID;
    console.log(url);

    request({
        url: url,
        method: "GET",
        qs: {
            client_id: process.env.fourSquare_API_client_id,
            client_secret: process.env.fourSquare_API_client_secret,
            v: 20180515
        },
    }, function (err, res, body) {
        if (err) {
            callback(err);
        }
        // console.log(JSON.parse(body));
        var result = JSON.parse(body);
        var venueInfo = {
            name: result.response.venue.name,
            url: result.response.venue.url,
            // facebook: result.response.venue.contact.facebookUsername,
            // twitter: result.response.venue.contact.twitter,
            // instagram: result.response.venue.contact.instagram
        };
        console.log(venueInfo);
        callback(null, venueInfo);
    });

};



