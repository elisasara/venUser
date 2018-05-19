var express = require("express");

// var router = express.Router();
var app = express();

var review = require("../models/post.js")

var venue = require("../public/js/venueSearch.js");



module.exports = function (app) {


    app.get('/', function (req, res) {
        res.render('index');
    });

    // app.get('/search', function(req,res) {
    //     res.render("results", {venue: venue});
    // });

    app.get("/venues", function (req, res) {
        // run the function passed in through venueSearch
        venue(function (err, result) {
            // render the results of the foursquare API call to the results handlebars file
            res.render("results", { venue: result });
        })
    });

    app.get("/venues/:id", function (req, res) {
        review.findAll(function (data) {
            { where: venue_id = req.params.id }
            var reviewObj = {
                reviews: data
            };
            console.log(reviewObj);
            res.render("venue", reviewObj);
        });
    });

    app.post("/api/venues", function (req, res) {
        review.create([
            // check these names with database
            "name_author", "category", "content"
        ], [
                req.body.name, req.body.type, req.body.review
            ], function (result) {
                res.json({ id: result.insertId });
            });
    });

}