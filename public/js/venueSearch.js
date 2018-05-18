var request = require("request");

// get the inputs from each of the fields

module.exports = function (city, state, venue) {
    request({
        url: "https://api.foursquare.com/v2/venues/search",
        method: "GET",
        qs: {
            client_id: "DJI2IAR1JVBJHOKACMOGQ0D31UFJJUGEGYOSQ3L30OSYWVUP",
            client_secret: "LD2PAKPD1Y5PGJOPWMWWJI2X5Z5NFTQ1JUSYBL0AFFATQ50D",
            near: "Philadelphia, PA",
            query: "Fillmore",
            v: 20180515,
            limit: 1
        },
    }, function (err, res, body) {
        console.log(body);
        var venue = JSON.parse(body);
        console.log("+++++++++++++++++++++++++++");
        console.log(venue);
        console.log(venue.response.venues[0]);
        console.log(venue.response.venues[0].name);
        console.log(venue.response.venues[0].id);

        var searchResults = {
            id: venue.response.venues[0].id,
            name: venue.response.venues[0].name,
        }
    });
}

// store each piece of info into a variable

// feed variables into appropriate foursquare api call

// create object for diplaying info in handlebars

// module.exports that object





// this gives you venue url, social media info, hours
var VENUE_ID = "55dda7ed498e67592140ff21";

request({
    url: "https://api.foursquare.com/v2/venues/" + VENUE_ID,
    method: "GET",
    qs: {
        client_id: "DJI2IAR1JVBJHOKACMOGQ0D31UFJJUGEGYOSQ3L30OSYWVUP",
        client_secret: "LD2PAKPD1Y5PGJOPWMWWJI2X5Z5NFTQ1JUSYBL0AFFATQ50D",
        v: 20180515
    },
}, function(err, res, body){
    console.log(JSON.parse(body));
})