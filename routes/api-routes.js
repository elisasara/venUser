require('dotenv').config();
var db = require("../models");
var request = require("request");

module.exports = function (app) {
    app.get("/api/reviews", function (req, res) {
        db.Review.findAll({}).then(function (data) {
            res.json(data);

        });
    });

    app.post("/venuelist", function (req, res) {
        var city = req.body.city;
        var state = req.body.state;
        var venue = req.body.venue;
        console.log(city + " ," + state + " ," + venue);
        var searchResults = [];
        request({
            url: "https://api.foursquare.com/v2/venues/search",
            method: "GET",
            qs: {
                client_id: process.env.fourSquare_API_client_id,
                client_secret: process.env.fourSquare_API_client_secret,
                near: city + "," + state,
                query: venue,
                v: 20180515,
                limit: 10
            },
        }, function (err, response, body) {
            if (err) {
                console.log(err);
            }
            // console.log(response);
            var venues = JSON.parse(body);
            var venueInfo = venues.response.venues;

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
            };
            console.log(searchResults);
            console.log(searchResults.length);
            res.render("results", { venue: searchResults });
        });
    });

       app.post("/venues/:id", function(req, res){
           var venueObj = {};
           var venueInfo;
            var venueId = req.params.id;
            var url = "https://api.foursquare.com/v2/venues/" + venueId;
            db.Review.findAll({
                where: {
                    venue_id: venueId
                }
            }).then(function(dbReview){

                // loop through array of reviews and then parse and stringify each review to add to the overall array
                // insert array into venueObj to be put into handlebars
                var reviewArr = [];
                var venueRating = 0;
                var reviewsToShow = JSON.parse(JSON.stringify(dbReview));
                console.log(reviewsToShow);
                for (var i=0; i<reviewsToShow.length; i++) {
                    // create an object that holds a key value pair for each star with a boolean value
                    var rating = reviewsToShow[i].rating_venue;
                    var stars = [];
                    // for each star given, loop through and add "true" to the array
                    for (var j=0; j<rating; j++) {
                        stars.push(true);
                    };

                    // for the remaining stars, loop through and add "false" to the array
                    for (var k=0; k<(5-rating); k++) {
                        stars.push(false);
                    };

                    // create object for each review that will then be pushed into the reviewArr
                    // in creating the object, set up the logic for the number of filled in stars versus the number of empty stars
                    var showReview = {
                        name_author: reviewsToShow[i].name_author,
                        category: reviewsToShow[i].category,
                        content: reviewsToShow[i].content,
                        rating_venue: rating,
                        stars: stars,
                        id: reviewsToShow[i].venue_id
                    };
                    // reviewArr.push(reviewsToShow[i]);
                    reviewArr.push(showReview);
                    venueRating = (venueRating + rating)/(i + 1);
                    console.log("Star Array: ", stars);
                };
                console.log("Review Array: ", reviewArr);
                console.log("Average Rating: ", venueRating);

            request({
                url: url,
                method: "GET",
                qs: {
                    client_id: process.env.fourSquare_API_client_id,
                    client_secret: process.env.fourSquare_API_client_secret,
                    v: 20180515
                },
            }, function (err, response, body) {
                if (err) {
                    console.log(err);
                }
                // console.log(JSON.parse(body));
                var result = JSON.parse(body);
                venueInfo = {
                    id: result.response.venue.id,
                    name: result.response.venue.name,
                    address: result.response.venue.location.address,
                    city: result.response.venue.location.city,
                    state: result.response.venue.location.state,
                    zip: result.response.venue.location.postalCode,
                    url: result.response.venue.url,
                    facebook: result.response.venue.contact.facebookUsername,
                    twitter: result.response.venue.contact.twitter,
                    instagram: result.response.venue.contact.instagram
                };

                console.log("venue Info:", venueInfo);

                venueObj = {
                    venueInfo: venueInfo,
                    venueRating: venueRating.toFixed(1),
                    reviewObj: reviewArr
                };

                    console.log("Whole Object: ", venueObj);
                    res.render("select", { venueObj: venueObj})
                    // res.render("select", {venueInfo: venueInfo});
                });
       });
    });

        app.post("/api/reviews", function (req, res) {
            db.Review.create(req.body).then(function (data) {
                res.json(data);

            });
        });

}
