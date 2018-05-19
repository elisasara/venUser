var express = require("express");
var app = express();
var review = require("../models/post.js")
var venueSearch = require("../public/js/venueSearch.js");
var venueResult = require("../public/js/venueResult.js");



module.exports = function (app) {


    app.get("/", function (req, res) {
        res.render("index");
    });

    // app.get('/search', function(req,res) {
    //     res.render("results", {venue: venue});
    // });

    app.get("/venues", function (req, res) {
        // run the function passed in through venueSearch
        venueSearch(function (err, result) {
            // render the results of the foursquare API call to the results handlebars file
            res.render("results", { venue: result });
        })
    });

    app.get("/venues/:id", function (req, res) {
        // get id of venue to pass into foursquare call
        var venueId = req.params.id;

        // run foursquare call and return info as an object
        venueResult(function (venueId, err, result) {
            // get all of the info from the database
            review.findAll(function (data) {
                { where: venue_id = req.params.id }
                // create one object with info from foursquare and from db
                var venueObj = {
                    venueInfo: result,
                    reviews: data
                };
                console.log(venueObj);
                // render to correct handlebars template
                res.render("select", venueObj);
            });
        });

        // review.findAll(function (data) {
        //     { where: venue_id = req.params.id }
        //     var reviewObj = {
        //         reviews: data
        //     };
        //     console.log(reviewObj);
        //     res.render("venue", reviewObj);
        // });
    });

    // app.post("/api/venues", function (req, res) {
    //     review.create([
    //         // check these names with database
    //         "name_author", "category", "content"
    //     ], [
    //             req.body.name, req.body.type, req.body.review
    //         ], function (result) {
    //             res.json({ id: result.insertId });
    //         });
    // });

}