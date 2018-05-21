var express = require("express");

var app = express(); 

var db = require("../models")

var venueSearch = require("../public/js/venueSearch.js");


module.exports = function(app) {


    router.get('/', function(req,res) {
        res.render('index');
    });

    // router.get('/search', function(req,res) {
    //     res.render('search');
    // });

    // router.get("/venues", function(req, res){
    //     // render the results of the foursquare API call to the results handlebars file
    //     res.render("results", venueSearch);
    // });

    // router.get("/venues/:id", function(req, res){
    //     review.findAll(function(data){
    //         {where: venue_id = req.params.id}
    //         var reviewObj = {
    //             reviews: data
    //         };
    //         console.log(reviewObj);
    //         res.render("venue", reviewObj);
    //     });
    // });

    // router.post("/api/venues", function(req, res){
    //     review.create([
    //         // check these names with database
    //         "name_author", "category", "content"
    //     ], [
    //         req.body.name, req.body.type, req.body.review
    //     ], function(result){
    //         res.json({ id: result.insertId });
    //     });
    
    //route to the handlebar form page.status: working =) 
    app.get("/form", function (req, res) {
        res.render("form")
    })
};
