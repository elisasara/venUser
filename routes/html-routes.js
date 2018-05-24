var express = require("express");
var app = express();
var db = require("../models")

// var venueResult = require("../public/js/venueResult.js");

// var venueSearch = require("../public/js/venueSearch.js");



module.exports = function(app) {

    app.get("/", function (req, res) {
        res.render("index");
    });

    // app.get("/venues", function (req, res) {
        
    //     // run the function passed in through venueSearch
    //     // venueSearch(function (err, result) {
    //         // render the results of the foursquare API call to the results handlebars file
    //         res.render("results", { venue: res });
    //     // })
    // });

    // app.get("/venues/:id", function (req, res) {
    //     // get id of venue to pass into foursquare call
    //     var venueId = req.params.id;

    //     var venueObj;
    //     // run foursquare call and return info as an object
    //     venueResult(venueId, function (err, result) {
    //         // get all of the info from the database
    //         db.Review.findAll({
    //              where: {venue_id: venueId}
    //             }).then(function(data){
    //             // create one object with info from foursquare and from db
    //             venueObj = {
    //                 venueInfo: result,
    //                 reviews: data
    //             };
    //             console.log(venueObj);
    //             res.render("select", {venueObj: venueObj})
    //         });
    //     })
    // });

       app.get("/form", function (req, res) {
        res.render("form")
    })
};
