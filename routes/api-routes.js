require('dotenv').config();
var db = require("../models");
var request = require("request");

module.exports = function (app) {
    app.get("/api/reviews", function (req, res) {
        db.Review.findAll({}).then(function (data) {
            res.json(data);

        });
    });
    // app.get("/api/review/:id", function (req, res) {
    //     db.Review.findOne({
    //         where: {
    //             venue_id: req.params.id
    //         }
    //     }).then(function (data) {
    //         res.json(data);
    //     });
    // });

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
                var reviewsToShow = JSON.parse(JSON.stringify(dbReview));
                // console.log(reviewsToShow);
                for (var i=0; i<reviewsToShow.length; i++) {
                    reviewArr.push(reviewsToShow[i]);
                };
                console.log("Review Array: ", reviewArr);
                // venueObj = { 
                //     // venueInfo: venueInfo, 
                //     review: dbReview
                // };
                // console.log("First: ", venueObj);

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
                    name: result.response.venue.name,
                    url: result.response.venue.url,
                    facebook: result.response.venue.contact.facebookUsername,
                    twitter: result.response.venue.contact.twitter,
                    instagram: result.response.venue.contact.instagram
                };

                console.log("venue Info:", venueInfo);

                venueObj = {
                    venueInfo: venueInfo,
                    reviewObj: reviewArr
                };

                // db.Review.findAll({
                //     where: {
                //         venue_id: venueId
                //     }
                // }).then(function(dbReview){
                //     venueObj = { 
                //         venueInfo: venueInfo, 
                //         review: dbReview 
                //     };

                    // console.log(venueObj);
                    res.render("select", { venueObj: venueObj})
                    // res.render("select", {venueInfo: venueInfo});
                });
       });
    });


    //get route 
    // app.get("/venues/:id", function (req, res){

    //         db.Review.findAll({
    //             where: {
    //                 venue_id: venueId
    //             }
    //         }).then(function (dbReview) {
    //            reviewObj = {
    //                 venueInfo: venueInfo,
    //                 review: dbReview
    //             };

    //             console.log(reviewObj);
    //             res.render("select", { reviewObj: reviewObj })
    //     });
    // });
    // app.post("/venues/:id", function (req, res) {
    //     var venueId = req.params.id;
    //     var url = "https://api.foursquare.com/v2/venues/" + venueId;
    //     request({
    //         url: url,
    //         method: "GET",
    //         qs: {
    //             client_id: process.env.fourSquare_API_client_id,
    //             client_secret: process.env.fourSquare_API_client_secret,
    //             v: 20180515
    //         },
    //     }, function (err, response, body) {
    //         var venueInfo = "";
    //         var reviewInfo = "";
    //         if (err) {
    //             console.log(err);
    //         }
            // console.log(JSON.parse(body));
            // var result = JSON.parse(body);
            // venueInfo = {
            //     name: result.response.venue.name,
            //     url: result.response.venue.url,
            //     facebook: result.response.venue.contact.facebookUsername,
            //     twitter: result.response.venue.contact.twitter,
            //     instagram: result.response.venue.contact.instagram
            // };
            // console.log("Venue info: ", venueInfo);
            // res.json(venueInfo);

            // db.Review.findAll({
            //     where: {
            //         venue_id: venueId
            //     }
            // }).then(function (data) {

            //     console.log("data: ", data);
            //     venueObj = {
            //         venueInfo: venueInfo,
            //         reviews: data
            //     };
            //     console.log("Venue object: ", venueObj);
                // reviewInfo = {
                //     reviews: data
                // }
                // console.log("Review info: ", reviewInfo.reviews[0])
                // console.log("dataValues " + reviewInfo.dataValues)
                // console.log("reviewInfo " + reviewInfo.reviews[0]);
                // res.render("select", { venueInfo: venueInfo, reviewInfo: reviewInfo })
        //         res.render("select", {venueObj: venueObj})
        //     });
        // });


        //post route to send reviews to database status: working =)

        app.post("/api/reviews", function (req, res) {
            db.Review.create(req.body).then(function (data) {
                res.json(data);

            });
        });

}
