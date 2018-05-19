var request = require("request");

// get the inputs from each of the fields



module.exports = function (callback) {

    request({
        url: "https://api.foursquare.com/v2/venues/search",
        method: "GET",
        qs: {
            client_id: "DJI2IAR1JVBJHOKACMOGQ0D31UFJJUGEGYOSQ3L30OSYWVUP",
            client_secret: "LD2PAKPD1Y5PGJOPWMWWJI2X5Z5NFTQ1JUSYBL0AFFATQ50D",
            near: "Philadelphia, PA",
            query: "Fillmore",
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
        for (var i=0; i<venueInfo.length; i++) {
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
};

