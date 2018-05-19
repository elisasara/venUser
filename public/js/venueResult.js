var request = require("request");

// get the inputs from each of the fields

module.exports = function (VENUE_ID, callback) {
    var url = "https://api.foursquare.com/v2/venues/" + VENUE_ID;
    console.log(url);

    request({
        url: url,
        method: "GET",
        qs: {
            client_id: "DJI2IAR1JVBJHOKACMOGQ0D31UFJJUGEGYOSQ3L30OSYWVUP",
            client_secret: "LD2PAKPD1Y5PGJOPWMWWJI2X5Z5NFTQ1JUSYBL0AFFATQ50D",
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
            facebook: result.response.venue.contact.facebookUsername,
            // twitter: result.response.venue.contact.twitter,
            // instagram: result.response.venue.contact.instagram
        };
        console.log(venueInfo);
        callback(null, venueInfo);
    });

};



